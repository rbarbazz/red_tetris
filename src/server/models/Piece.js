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

  rotate(n) {
    this._orientation = (ORIENTATION.length + this._orientation + n) % ORIENTATION.length;
  }

}
