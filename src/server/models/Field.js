import { Piece } from './Piece';
import { tryTranslate, tryRotate } from '../controllers/srs';

export default class Field {
  constructor(width, height) {
    this._size = { width, height };
    this._map = Array(height).fill(Array(width).fill(0));
    this._hardline = 0; // Unbreakable lines
    this._tetros = null; // Actual tetris
    this._pos = null; // Position x,y of the actual tetris
  }

  get size() {
    return this._size;
  }

  get pos() {
    return this._pos;
  }

  get field() {
    return this._map;
  }

  spawn(tetrosId) {
    this._tetros = new Piece(tetrosId);
    this._pos = this._tetros.spawn;
  }

  addUnbreakLine() {
    if (this._hardline < this._size.height) {
      this._harline += 1;
    }
  }

  _move(to) {
    if (this._tetros === null) return false;
    const r = tryTranslate(this, this._tetros.shape, to);
    if (r === null) return false;
    this._pos = r;
    return true;
  }

  _turn(n) {
    if (this._tetros === null) return false;
    const r = tryRotate(this, this._tetros, this._tetros.getRot(n));
    if (r === null) return false;
    this._pos = r.pos;
    this._tetros.orientation = r.orientation;
    return true;
  }

  moveDown() {
    const to = [this._pos[0], this._pos[1] - 1];
    return this._move(to);
  }

  moveRight() {
    const to = [this._pos[0] + 1, this._pos[1]];
    return this._move(to);
  }

  moveLeft() {
    const to = [this._pos[0] - 1, this._pos[1]];
    return this._move(to);
  }

  turnRight() {
    return this._turn(1);
  }

  turnLeft() {
    return this._turn(-1);
  }

  serialize() {
    // Copy entire board
    const board = Array.from(this._map);
    // Paste the current tetros
    if (this._tetros !== null) {
      const { shape } = this._tetros;
      for (let y = 0; y < shape.length; ++y) {
        const yPos = this._pos[1] + y;
        for (let x = 0; x < shape.length; ++x) {
          const xPos = this._pos[0] + x;
          if (shape[y][x] === '1') {
            if (xPos >= 0 && xPos < this._size.width - 1
              && yPos >= 0 && yPos < this._size.height - 1) {
              board[yPos][xPos] = this._tetros.id;
            }
          }
        }
      }
    }
    return board;
  }
}
