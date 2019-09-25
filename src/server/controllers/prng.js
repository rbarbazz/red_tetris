import timeNow from './time';

/*
  Simple implementation of a PRNG
*/

const CYCLE = 2147487343; // Max value, prime number

export default class PNRG {
  constructor(seed = 0) {
    if (seed === null || seed <= 0) seed = timeNow();
    this._seed = seed;
    this._state = seed;
  }

  static min() {
    return 0;
  }

  static max() {
    return CYCLE;
  }

  get seed() {
    return this._seed;
  }

  rand(min = 0, max = CYCLE) {
    if (min >= max) return 0;
    this._state = (7 * this._state) % CYCLE;
    const r = min + ((this._state - 1) % (max - min));
    return r;
  }

  // Quick test
  test(min, max) {
    let c = 0;
    for (let i = 0; i < CYCLE + 1; i += 1) {
      const r = this.rand(min, max);
      if (r < min || r > max - 1) c += 1;
    }
    return c;
  }
}
