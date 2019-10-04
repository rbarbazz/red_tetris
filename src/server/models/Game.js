import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, GAME_TYPE, CONFIG, KEYS, playerType } from '../../common/enums';
import Field from './Field';
import { Score, makeLeaderboard } from './Score';
import timeNow from '../controllers/time';
import { Bag } from './7bag';
import { TETROS } from './Piece';

function computeSpeed(difficulty, lvl, mode, autofall = false) {
  let msec;
  if (autofall === true) {
    msec = CONFIG.FALL_SPEED;
  } else if (mode === GAME_TYPE.CLASSIC) {
    msec = CONFIG.DEFAULT_SPEED;
  } else {
    msec = ((difficulty - ((lvl - 1) * 0.007)) ** (lvl - 1)) * 1000.0;
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
    this._spectrumsCache = [];
    this._startTimer = null;
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
        harddrop: false, // For scoring
        player, // Player instance
      };
    });
    this._spectators = {}; // { name: {player, lookingto} }
  }

  addSpectator(master, player) {
    // eslint-disable-next-line no-prototype-builtins
    if (this._spectators.hasOwnProperty(player.id)) {
      return false;
    }
    this._spectators[player.id] = { player, lookingat: master.id };
    return true;
  }

  removeSpectator(player) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this._spectators.hasOwnProperty(player.id)) {
      return false;
    }
    this._spectators[player.id].player._room = null;
    delete this._spectators[player.id];
    return true;
  }

  isSpectator(player) {
    // eslint-disable-next-line no-prototype-builtins
    return this._spectators.hasOwnProperty(player.id);
  }

  isPlayer(player) {
    // eslint-disable-next-line no-prototype-builtins
    return this._instances.hasOwnProperty(player.id);
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
        if (instance.field.canMoveDown() !== false) {
          instance.harddrop = false;
          instance.lock = false;
          this.cancelTimer(instance);
          this.startTimer(instance);
          return false;
        }
        const n = instance.field.lock();
        if (n !== null) {
          // linebreak
          instance.field.breakLines(n);
          instance.score.compute(n.length, instance.harddrop);
          if (this.type === GAME_TYPE.CLASSIC) {
            this.addUnbreakLines(instance, n.length - 1);
          }
        } else {
          instance.score.compute(0, instance.harddrop);
        }
        instance.harddrop = false;
        instance.pieceId += 1;
        instance.lock = false;
        if (instance.field.spawn(this._bag.piece(instance.pieceId)) === false) {
          instance.run = false;
        } else {
          this.cancelTimer(instance);
          this.send(instance, true);
          this.startTimer(instance);
        }
        return true;
      }, CONFIG.LOCK_COOLDOWN);
    }
    return r;
  }

  spectatorAction(player, action) {
    if (action.key !== KEYS.CLICK) return false;
    const { name } = action;
    if (name === undefined) return false;
    const spectator = this._spectators[player.id];
    if (spectator === undefined) return false;
    let to = null;
    for (const instance of Object.values(this._instances)) {
      if (name === instance.player.name) {
        to = instance.player.id;
        break;
      }
    }
    if (to !== null) {
      spectator.lookingat = to;
      this.send(this._instances[to], false);
    }
    return true;
  }

  playerAction(player, action) {
    if (player.type === playerType.SPECTATOR) {
      return this.spectatorAction(player, action);
    }
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
          instance.harddrop = true;
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
      this.send(instance, false);
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
    const report = this.makeReport();
    const leaderboard = makeLeaderboard(report, this.type);
    // Go to report directly
    if (this.soloMode()) {
      comm.sendRequest(instance.player.socket, eventType.GAME,
        msgType.SERVER.GAME_REPORT, { report, leaderboard });
    } else {
      let stillRunning = 0;
      for (const player of Object.values(this._instances)) {
        if (player.run === true) {
          stillRunning += 1;
          dbg.info(player.player.name);
        }
      }
      // 0 or 1 player left, go to report for ALL
      if (stillRunning < 2) {
        for (const player of Object.values(this._instances)) {
          this.cancelTimer(player);
          this.cancelLockTimer(player);
          comm.sendRequest(player.player.socket, eventType.GAME,
            msgType.SERVER.GAME_REPORT, { report, leaderboard });
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
    report.sort((a, b) => (a.score.pts < b.score.pts));
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
    this._startTimer = setTimeout(() => {
      this.running = true;
      for (const instance of Object.values(this._instances)) {
        instance.field.spawn(this._bag.piece(instance.pieceId));
        instance.speed = computeSpeed(this._difficulty, instance.score.lvl, this.type);
        this.computeSpectrums();
        this.send(instance, true);
        this.startTimer(instance);
      }
    }, CONFIG.START_DELAY);
  }

  stop() {
    clearTimeout(this._startTimer);
    this.running = false;
    for (const instance of Object.values(this._instances)) {
      this.removePlayer(instance.player, false);
    }
    for (const spectator of Object.values(this._spectators)) {
      spectator.player.leaveRoom();
      comm.sendResponse(spectator.player.socket, eventType.GAME, msgType.CLIENT.LEAVE_ROOM);
    }
    delete this._instances;
    delete this._bag;
  }

  removePlayer(player, ping = true) {
    const instance = this._instances[player.id];
    instance.run = false;
    this.cancelTimer(instance);
    this.cancelLockTimer(instance);
    this.checkEndParty(instance);
    delete instance.field;
    delete instance.score;
    delete this._instances[instance.player.id];
    if (ping === true) {
      this.send(null, true);
    }
  }

  computeSpectrums() {
    const specs = [];
    for (const player of Object.values(this._instances)) {
      specs.push({
        board: player.field.spectrum(),
        name: player.player.name,
      });
    }
    this._spectrumsCache = specs;
  }

  send(instance, spectrums, firstTick = false) {
    if (spectrums === true) {
      this.computeSpectrums();
      for (const player of Object.values(this._instances)) {
        const pid = (firstTick === true) ? 0 : player.pieceId + 1;
        const data = {
          board: player.field.serialize(),
          score: player.score.serialize(),
          nextPiece: TETROS[this._bag.piece(pid)][0],
          spectrums: this._spectrumsCache,
        };
        comm.sendRequest(player.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
          data);
        this.sendToSpectators(player, data);
      }
    } else {
      const pid = (firstTick === true) ? 0 : instance.pieceId + 1;
      const data = {
        board: instance.field.serialize(),
        score: instance.score.serialize(),
        nextPiece: TETROS[this._bag.piece(pid)][0],
        spectrums: this._spectrumsCache,
      };
      comm.sendRequest(instance.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
        data);
      this.sendToSpectators(instance, data);
    }
  }

  sendToSpectators(to, data) {
    data.lookingat = to.player.name;
    for (const spectator of Object.values(this._spectators)) {
      if (to.player.id === spectator.lookingat) {
        comm.sendRequest(spectator.player.socket, eventType.GAME,
          msgType.SERVER.GAME_TICK, data);
      }
    }
  }
}

export default Game;
