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
        field: new Field(24, 10), // Field of the player
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
    const now = timeNow();
    if (instance.cooldown - now > 0) return false;
    instance.cooldown = now + CONFIG.COOLDOWN;
    let doSmth = true;
    if (action.event === 'keydown') {
      if (action.key === KEYS.DOWN) {
        instance.hitDown = true;
        instance.field.moveDown();
      } else if (action.key === KEYS.SPACE) {
        instance.lock = true;
      } else if (action.key === KEYS.LEFT) {
        if (instance.field.moveLeft() === false) {
          doSmth = false;
        }
      } else if (action.key === KEYS.RIGHT) {
        if (instance.field.moveRight() === false) {
          doSmth = false;
        }
      } else doSmth = false;
    } else if (action.event === 'keyup') {
      if (action.key === KEYS.DOWN) {
        instance.hitDown = false;
      } else if (action.key === KEYS.UP) {
        if (instance.field.turnRight() === false) {
          doSmth = false;
        }
      } else doSmth = false;
    } else doSmth = false;
    return doSmth;
  }

  tick(player) {
    comm.sendRequest(player.socket, eventType.GAME, msgType.GAME_TICK,
      { field: this._instances[player.id].field.serialize() });
  }

  start() {
    this._bag.push(new RandomBag());
    Object.values(this._instances).forEach((player) => {
      player.field.spawn(this._bag[0].piece(0));
    });
  }

  stop() {
    return this;
  }
}

export default Game;
