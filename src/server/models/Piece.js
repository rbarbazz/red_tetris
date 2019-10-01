import { TETROS_SHAPE } from '../../common/enums';
/*
  KICKS[from][to] = [translation(x, y)...] with x to right and y to up
  Five translation tests, special values for I
*/
const TETROS_KICKS = {
  I: {
    0: {
      3: [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
      1: [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
    },
    1: {
      0: [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
      2: [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
    },
    2: {
      1: [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
      3: [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    },
    3: {
      2: [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
      0: [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
    },
  },
  ALL: {
    0: {
      3: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
      1: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    },
    1: {
      0: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
      2: [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    },
    2: {
      1: [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
      3: [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    },
    3: {
      2: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
      0: [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    },
  },
};

/*
  (x, y) based on TETROS_SHAPE
*/
const TETROS_SPAWN = {
  O: [4, 21],
  I: [3, 20],
  T: [3, 21],
  L: [3, 21],
  J: [3, 21],
  Z: [3, 21],
  S: [3, 21],
};

const ORIENTATION = [0, 1, 2, 3]; // Spawn, 90deg, 180deg, -90deg

export const TETROS = [['O', 1], ['I', 2], ['T', 3], ['L', 4], ['J', 5], ['Z', 6], ['S', 7]];

export class Piece {
  constructor(key) {
    this._tetros = TETROS[key];
    this._orientation = 0;
  }

  get id() {
    return this._tetros[1];
  }

  get tetros() {
    return this._tetros;
  }

  get orientation() {
    return this._orientation;
  }

  get spawn() {
    return TETROS_SPAWN[this._tetros[0]];
  }

  get shape() {
    return TETROS_SHAPE[this._tetros[0]][this._orientation];
  }

  get shapes() {
    return TETROS_SHAPE[this._tetros[0]];
  }

  get kicks() {
    if (this._tetros[0] === 'O') return null;
    if (this._tetros[0] === 'I') return TETROS_KICKS.I;
    return TETROS_KICKS.ALL;
  }

  getRot(n) {
    return (ORIENTATION.length + this._orientation + n) % ORIENTATION.length;
  }

  set orientation(n) {
    this._orientation = n;
  }

  rotate(n) {
    this._orientation = this.getRot(n);
  }
}
