
export const TETRIS = {
  I: 'I',
  O: 'O',
  T: 'T',
  L: 'L',
  J: 'J',
  Z: 'Z',
  S: 'S',
};

export const ORIENTATION = [0, 1, 2, 3]; // Default, 90deg, 180deg, -90deg

export class Piece {
  constructor(type) {
    this._type = type;
    [this._orientation] = ORIENTATION;
  }

  get type() {
    return this._type;
  }

  get orientation() {
    return this._orientation;
  }

  _turn(n) {
    this._orientation = (ORIENTATION.length + this._orientation + n) % ORIENTATION.length;
  }

  turnRight() {
    this._turn(1);
  }

  turnLeft() {
    this._turn(-1);
  }
}
