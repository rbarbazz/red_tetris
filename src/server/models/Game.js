import * as dbg from '../../common/devLog';
import { CONFIG, TETRIS } from '../../common/enums';
import PRNG from '../controllers/prng';
import Board from './Board';
import Score from './Score';
import { Piece } from './Piece';
import timeNow from '../controllers/time';

/*
  Create an instance for each player
*/
class Game {
  constructor(type, speed, players) {
    this._type = type;
    this._speed = speed;
    this._rng = new PRNG();
    this._pieces = [this._rng.rand(0, TETRIS.length)]; // Id of piece in the TETRIS list
    this._instances = {};
    Object.values(players).forEach((player) => {
      this._instances[player.id] = {
        field: new Board(20, 10), // Field of the player
        score: new Score(), // Score instance
        pieceId: 0, // Current pos of the piece list
        piece: new Piece(TETRIS[0]), // Current instance of piece
        pos: { x: 5, y: 0 },
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
    instance.cooldown = now + (CONFIG.COOLDOWN * 1000);
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
        instance.piece.rotate(1);
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
