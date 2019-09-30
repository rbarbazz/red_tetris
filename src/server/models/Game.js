import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG, KEYS } from '../../common/enums';
import Field from './Field';
import Score from './Score';
import timeNow from '../controllers/time';
import Bag from './7bag';

function computeSpeed(difficulty, lvl, autofall = false) {
  let sec = ((difficulty - ((lvl - 1) * 0.007)) ** (lvl - 1)) * 1000;
  if (autofall === true) {
    sec = 12.0;
  }
  return parseInt(Math.floor(sec), 10);
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
        autoFall: false, // Auto fall until next piece
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
      instance.autoFall = false;
      instance.speed = computeSpeed(this._difficulty, instance.score.lvl);
      // Add this part in lock timer function
      setTimeout(() => {
        instance.field.lock();
        instance.pieceId += 1;
        instance.lock = false;
        if (instance.field.spawn(this._bag.piece(instance.pieceId)) === false) {
          instance.run = false;
        }
        this.send(instance);
        this.cancelTimer(instance);
        this.startTimer(instance);
      }, 500);
    }
    return r;
  }

  playerAction(player, action) {
    const instance = this._instances[player.id];
    let doSmth = null;
    if (action.event === 'keydown') {
      if (action.key === KEYS.DOWN) {
        doSmth = () => {
          instance.hitDown = true;
          this.cancelTimer(instance);
          return this.actionDown(instance);
        };
      } else if (action.key === KEYS.LEFT) {
        doSmth = () => instance.field.moveLeft();
      } else if (action.key === KEYS.RIGHT) {
        doSmth = () => instance.field.moveRight();
      }
    } else if (action.event === 'keyup') {
      if (action.key === KEYS.DOWN) {
        doSmth = () => {
          instance.hitDown = false;
          this.startTimer(instance);
          return false;
        };
      } else if (action.key === KEYS.UP) {
        doSmth = () => instance.field.turnRight();
      } else if (action.key === KEYS.SPACE) {
        doSmth = () => {
          instance.autoFall = true;
          instance.speed = computeSpeed(this._difficulty, instance.score.lvl, true);
          this.cancelTimer(instance);
          this.startTimer(instance);
        };
      }
    }
    if (doSmth === null) return false;
    if (instance.autoFall === true) return true;
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

  cancelTimer(instance) {
    clearTimeout(instance.timer);
    delete instance.timer;
    instance.timer = null;
    return this; // eslint
  }

  start() {
    for (const instance of Object.values(this._instances)) {
      instance.field.spawn(this._bag.piece(instance.pieceId));
      instance.speed = computeSpeed(this._difficulty, instance.score.lvl);
      this.send(instance);
      this.startTimer(instance);
    }
  }

  stop() {
    for (const instance of Object.values(this._instances)) {
      this.cancelTimer(instance);
    }
  }

  send(instance) {
    comm.sendRequest(instance.player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
      {
        board: instance.field.serialize(),
        nextPiece: this._bag.piece(instance.pieceId + 1),
      });
    return this;
  }
}

export default Game;
