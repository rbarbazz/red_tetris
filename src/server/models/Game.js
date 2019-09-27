import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG, KEYS } from '../../common/enums';
import Field from './Field';
import Score from './Score';
import timeNow from '../controllers/time';
import RandomBag from './7bag';

/*
  Create an instance for each player
*/
class Game {
  constructor(type, speed, players) {
    this._type = type;
    this._speed = speed;
    this._bag = [];
    this._instances = {};
    Object.values(players).forEach((player) => {
      this._instances[player.id] = {
        field: new Field(10, 23), // Field of the player
        score: new Score(), // Score instance
        pieceId: [0, 0], // Current pos of the piece list [bag, pos]
        cooldown: 0, // Time before next action is available
        hitDown: false, // Speed up the fall until release
        lock: false, // Auto fall until next piece
        player, // Player instance
      };
    });
  }

  playerAction(player, action) {
    const instance = this._instances[player.id];
    let doSmth = null;
    if (action.event === 'keydown') {
      if (action.key === KEYS.DOWN) {
        doSmth = () => {
          instance.hitDown = true;
          return instance.field.moveDown();
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
          return false;
        };
      } else if (action.key === KEYS.UP) {
        doSmth = () => instance.field.turnRight();
      } else if (action.key === KEYS.SPACE) {
        doSmth = () => {
          instance.lock = true;
          return false;
        };
      }
    }
    if (doSmth === null) return false;
    const now = timeNow();
    if (instance.cooldown - now > 0) return false;
    instance.cooldown = now + CONFIG.COOLDOWN;
    return doSmth();
  }

  tick(player) {
    comm.sendRequest(player.socket, eventType.GAME, msgType.SERVER.GAME_TICK,
      { board: this._instances[player.id].field.serialize() });
  }

  start() {
    this._bag.push(new RandomBag());
    Object.values(this._instances).forEach((player) => {
      player.field.spawn(this._bag[0].piece(0));
      this.tick(player.player);
    });
  }

  stop() {
    return this;
  }
}

export default Game;
