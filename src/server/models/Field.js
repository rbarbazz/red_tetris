import { Piece } from './Piece';
import { tryTranslate, tryRotate } from '../controllers/srs';
import * as dbg from '../../common/devLog';

function pasteTetros(board, field, tetros) {
  if (tetros !== null) {
    const { shape } = tetros;
    for (let y = 0; y < shape.length; ++y) {
      const yPos = field.pos[1] - y;
      for (let x = 0; x < shape.length; ++x) {
        const xPos = field.pos[0] + x;
        if (shape[y][x] === '1') {
          if (xPos >= 0 && xPos < field.size.width
            && yPos >= 0 && yPos < field.size.height) {
            board[yPos][xPos] = tetros.id;
          }
        }
      }
    }
  }
}

export default class Field {
  constructor(width, height) {
    this._size = { width, height };
    this._map = new Array(height);
    for (let i = 0; i < height; ++i) {
      this._map[i] = new Array(width);
      this._map[i].fill(0);
    }
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
    this._pos = Array.from(this._tetros.spawn);
    // Blocked at spawn, end of game
    if (tryTranslate(this, this._tetros.shape, this._pos) === null) {
      return false;
    }
    return true;
  }

  lock() {
    pasteTetros(this._map, this, this._tetros);
    delete this._tetros;
    this._tetros = null;
    this._pos = null;
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

  spectrum() {
    const board = Array(this._size.height - 3);
    for (let i = 0; i < board.length; ++i) {
      board[i] = Array.from(this._map[i]);
    }
    for (let j = 0; j < board[0].length; ++j) {
      let write = false;
      for (let i = board.length - 1; i >= 0; --i) {
        if (this._map[i][j] !== 0 && write === false) write = true;
        board[i][j] = write === true ? 1 : 0;
      }
    }
    return board.reverse();
  }

  serialize() {
    // Copy entire board
    const board = Array(this._size.height);
    for (let i = 0; i < board.length; ++i) {
      board[i] = Array.from(this._map[i]);
    }
    pasteTetros(board, this, this._tetros);
    return board.slice(0, 20).reverse();
  }
}
