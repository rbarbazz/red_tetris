
export default class Board {
  constructor(width, height) {
    this._size = { width, height };
    this._map = Array(height * width).fill(0);
    this._hardline = 0; // Unbreakable lines
    this._tetris = null; // Actual tetris
    this._pos = { x: width / 2, y: height - 1 }; // Position x,y of the actual tetris
  }

  addUnbreakLine() {
    if (this._hardline < this._size.height) {
      this._harline += 1;
    }
  }

  moveDown() {
    this._pos.y -= 1;
  }

  moveRight() {
    if (this._pos.x < this._size.width - 1) {
      this._pos.x += 1
      return true;
    }
    return false;
  }

  moveLeft() {
    if (this._pos.x > 0) {
      this._pos.x -= 1
      return true;
    }
    return false;
  }

  turnRight() {
    if (this._tetris !== null) {
      this._tetris.rotate(1);
    }
  }

  turnLeft() {
    if (this._tetris !== null) {
      this._tetris.rotate(-1);
    }
  }

  toArray() {
    const board = Array.from(this._map);
    return board;
  }
}
