import * as dbg from '../../common/devLog';
import { CONFIG } from '../../common/enums';
import Field from './Field';
import Score from './Score';
import timeNow from '../controllers/time';

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
    if (action.event === 'keydown') {
      if (action.code === 'ArrowDown') {
        instance.hitDown = true;
      }
      if (action.code === 'Space') {
        instance.lock = true;
      }
      if (action.code === 'ArrowLeft') {
        if (instance.field.moveLeft() === false) {
          return false;
        }
      }
      if (action.code === 'ArrowRight') {
        if (instance.field.moveRight() === false) {
          return false;
        }
      }
    } else if (action.event === 'keyup') {
      if (action.code === 'ArrowDown') {
        instance.hitDown = false;
      }
      if (action.code === 'ArrowUp') {
        if (instance.field.turnRight() === false) {
          return false;
        }
      }
    }
    return true;
  }

  tick(player) {

  }

  start() {
  }

  stop() {
  }
}

export default Game;
