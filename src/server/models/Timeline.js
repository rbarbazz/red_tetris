
export class Timeline {
  constructor() {
    this._queue = [];
  }

  get messages() {
    return this._queue;
  }

  hasMessage() {
    return this._queue.length > 0;
  }

  push(msg) {
    this._queue.push(msg);
  }

  clear() {
    this._queue.splice(0, this._queue.length);
  }
}

export const timeline = new Timeline();
