import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, GAME_TYPE, CONFIG, KEYS } from '../../common/enums';
import Field from './Field';
import Score from './Score';
import timeNow from '../controllers/time';
import Bag from './7bag';
import { TETROS } from './Piece';

function computeSpeed(difficulty, lvl, mode, autofall = false) {
  if (mode === GAME_TYPE.CLASSIC) return 700;
  let msec = ((difficulty - ((lvl - 1) * 0.007)) ** (lvl - 1)) * 1000.0;
  if (autofall === true) {
    msec = CONFIG.FALL_SPEED;
  }
  return parseInt(Math.floor(msec), 10);
}

/*
  Create an instance for each player
*/
class Game {
  constructor(type, difficulty, players) {
    this.running = false;
    this.type = type;
    this._difficulty = difficulty;
    this._bag = new Bag();
    this._instances = {};
    Object.values(players).forEach((player) => {
      this._instances[player.id] = {
        field: new Field(10, 24), // Field of the player
        score: new Score(), // Score instance
        pieceId: 0, // Current pos of the piece
        cooldown: 0, // Time before next action is available
        hitDown: false, // Speed up the fall until release
        lock: false, // Are we inside the lock timer frame
        timer: null, // setTimeout object
        lockTimer: null,
        speed: 0, // Current speed timer
        run: true, // false when end of party
        player, // Player instance
      };
    });
  }

  addUnbreakLines(instance, n) {
    for (const player of Object.values(this._instances)) {
      if (instance.player.id !== player.player.id) {
        player.field.addUnbreakLines(n);
      }
    }
  }

  actionDown(instance) {
    const r = instance.field.moveDown();
    if (r === false && instance.lock === false) {
      // this.cancelTimer(instance);
      instance.lock = true;
      // Add this part in lock timer function
      instance.lockTimer = setTimeout(() => {
        const n = instance.field.lock();
        if (n !== null) {
          // linebreak
          instance.field.breakLines(n);
          instance.score.addLineBreak(n.length);
          if (this.mode === GAME_TYPE.CLASSIC) {
            this.addUnbreakLines(instance, n);
          }
        }
        instance.pieceId += 1;
        instance.lock = false;
        if (instance.field.spawn(this._bag.piece(instance.pieceId)) === false) {
          instance.run = false;
        } else {
          this.cancelTimer(instance);
          this.send(instance, true);
          this.startTimer(instance);
        }
      }, CONFIG.LOCK_COOLDOWN);
    }
    return r;
  }

  playerAction(player, action) {
    const instance = this._instances[player.id];
    if (instance.run === false) return false;
    let doSmth = null;
    if (action.event === 'keydown') {
      if (action.key === KEYS.DOWN && instance.hitDown === false) {
        doSmth = () => {
          instance.hitDown = true;
          instance.speed = computeSpeed(this._difficulty, instance.score.lvl, this.type,
            true);
          this.cancelTimer(instance);
          this.startTimer(instance);
          return false;
        };
      }
    } else if (action.event === 'keyup') {
      if (action.key === KEYS.DOWN) {
        doSmth = () => {
          instance.hitDown = false;
          instance.speed = computeSpeed(this._difficulty, instance.score.lvl, this.type);
          this.cancelTimer(instance);
          this.startTimer(instance);
          return false;
        };
      } else if (action.key === KEYS.LEFT) {
        doSmth = () => instance.field.moveLeft();
      } else if (action.key === KEYS.RIGHT) {
        doSmth = () => instance.field.moveRight();
      } else if (action.key === KEYS.UP) {
        doSmth = () => instance.field.turnRight();
      } else if (action.key === KEYS.SPACE) {
        doSmth = () => {
          instance.field.goToShadow();
          this.actionDown(instance);
          return true;
        };
      }
    }
    if (doSmth === null) return false;
    const now = timeNow();
    if (instance.cooldown - now > 0) return false;
    instance.cooldown = now + CONFIG.COOLDOWN;
    return doSmth();
  }

  tick(instance) {
    const r = this.actionDown(instance);
    if (r === true) {
      this.send(instance);
    }
  }

  startTimer(instance) {
    instance.timer = setTimeout(() => {
      if (instance.lock === false) {
        this.tick(instance);
      }
      if (instance.run === true) {
        this.startTimer(instance);
      } else {
        this.checkEndParty(instance);
        this.cancelLockTimer(instance);
        this.cancelTimer(instance);
      }
    }, instance.speed);
    return this; // eslint
  }

  soloMode() {
    return Object.keys(this._instances).length === 1;
  }

  checkEndParty(instance) {
    // Go to report directly
    if (this.soloMode()) {
      comm.sendRequest(instance.player.socket, eventType.GAME,
        msgType.SERVER.GAME_REPORT, { report: this.makeReport() });
    } else {
      let stillRunning = 0;
      for (const player of Object.values(this._instances)) {
        if (player.run === true) stillRunning += 1;
      }
      // 0 or 1 player left, go to report for ALL
      if (stillRunning < 2) {
        for (const player of Object.values(this._instances)) {
          this.cancelTimer(player);
          this.cancelLockTimer(player);
          comm.sendRequest(player.player.socket, eventType.GAME,
            msgType.SERVER.GAME_REPORT, { report: this.makeReport() });
        }
      // 2 or more players left, go to end for the current player
      } else {
        comm.sendRequest(instance.player.socket, eventType.GAME,
          msgType.SERVER.GAME_END);
      }
    }
  }

  makeReport() {
    const report = [];
    for (const player of Object.values(this._instances)) {
      report.push({ name: player.player.name, score: player.score.serialize() });
    }
    report.sort((a, b) => (a.pts < b.pts));
    return report;
  }

  // eslint-disable-next-line class-methods-use-this
  cancelLockTimer(instance) {
    if (instance.lockTimer !== null) {
      clearTimeout(instance.lockTimer);
    }
    delete instance.lockTimer;
    instance.lockTimer = null;
  }

  // eslint-disable-next-line class-methods-use-this
  cancelTimer(instance) {
    if (instance.timer !== null) {
      clearTimeout(instance.timer);
    }
    delete instance.timer;
    instance.timer = null;
  }

  start() {
    this.running = true;
    for (const instance of Object.values(this._instances)) {
      instance.field.spawn(this._bag.piece(instance.pieceId));
      instance.speed = computeSpeed(this._difficulty, instance.score.lvl, this.type);
      this.send(instance, true);
      this.startTimer(instance);
    }
  }

  stop() {
    this.running = false;
    for (const instance of Object.values(this._instances)) {
      this.removePlayer(instance.player, false);
    }
    delete this._instances;
    delete this._bag;
  }

  removePlayer(player, ping = true) {
    const instance = this._instances[player.id];
    this.cancelTimer(instance);
    this.cancelLockTimer(instance);
    delete instance.field;
    delete instance.score;
    delete this._instances[instance.player.id];
    if (ping === true) {
      this.send(null, true);
    }
  }

  send(instance, spectrums = false) {
    const specs = [];
    if (spectrums === true) {
      for (const player of Object.values(this._instances)) {
        specs.push({
          board: player.field.spectrum(),
          name: player.player.name,
        });
      }
      for (const player of Object.values(this._instances)) {
        comm.sendRequest(player.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
          {
            board: player.field.serialize(),
            score: player.score.serialize(),
            nextPiece: TETROS[this._bag.piece(player.pieceId + 1)][0],
            spectrums: specs,
          });
      }
    } else {
      comm.sendRequest(instance.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
        {
          board: instance.field.serialize(),
          score: instance.score.serialize(),
          nextPiece: TETROS[this._bag.piece(instance.pieceId + 1)][0],
          spectrums: specs,
        });
    }
  }
}

export default Game;
