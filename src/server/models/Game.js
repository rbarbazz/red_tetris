import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG, KEYS } from '../../common/enums';
import Field from './Field';
import Score from './Score';
import timeNow from '../controllers/time';
import Bag from './7bag';
import { TETROS } from '../models/Piece';

function computeSpeed(difficulty, lvl, autofall = false) {
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
    this._type = type;
    this._difficulty = difficulty;
    this._bag = new Bag();
    this._instances = {};
    Object.values(players).forEach((player) => {
      this._instances[player.id] = {
        field: new Field(10, 23), // Field of the player
        score: new Score(), // Score instance
        pieceId: 0, // Current pos of the piece
        cooldown: 0, // Time before next action is available
        hitDown: false, // Speed up the fall until release
        lock: false, // Are we inside the lock timer frame
        timer: null, // setTimeout object
        speed: 0, // Current speed timer
        run: true, // false when end of party
        player, // Player instance
      };
    });
  }

  actionDown(instance) {
    const r = instance.field.moveDown();
    if (r === false && instance.lock === false) {
      this.cancelTimer(instance);
      instance.lock = true;
      // Add this part in lock timer function
      setTimeout(() => {
        instance.field.lock();
        instance.pieceId += 1;
        instance.lock = false;
        if (instance.field.spawn(this._bag.piece(instance.pieceId)) === false) {
          instance.run = false;
        }
        this.send(instance, true);
        this.cancelTimer(instance);
        this.startTimer(instance);
      }, CONFIG.LOCK_COOLDOWN);
    }
    return r;
  }

  playerAction(player, action) {
    const instance = this._instances[player.id];
    let doSmth = null;
    if (action.event === 'keydown') {
      if (action.key === KEYS.DOWN && instance.hitDown === false) {
        doSmth = () => {
          instance.hitDown = true;
          instance.speed = computeSpeed(this._difficulty, instance.score.lvl, true);
          this.cancelTimer(instance);
          this.startTimer(instance);
          return false;
        };
      }
    } else if (action.event === 'keyup') {
      if (action.key === KEYS.DOWN) {
        doSmth = () => {
          instance.hitDown = false;
          instance.speed = computeSpeed(this._difficulty, instance.score.lvl);
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
        comm.sendRequest(instance.player.socket, eventType.GAME,
          msgType.SERVER.GAME_END);
      }
    }, instance.speed);
    return this; // eslint
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
    for (const instance of Object.values(this._instances)) {
      instance.field.spawn(this._bag.piece(instance.pieceId));
      instance.speed = computeSpeed(this._difficulty, instance.score.lvl);
      this.send(instance, true);
      this.startTimer(instance);
    }
  }

  stop() {
    for (const instance of Object.values(this._instances)) {
      this.cancelTimer(instance);
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
            nextPiece: TETROS[this._bag.piece(player.pieceId + 1)][0],
            spectrums: specs,
          });
      }
    } else {
      comm.sendRequest(instance.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
        {
          board: instance.field.serialize(),
          nextPiece: TETROS[this._bag.piece(instance.pieceId + 1)][0],
          spectrums: specs,
        });
    }
  }
}

export default Game;
