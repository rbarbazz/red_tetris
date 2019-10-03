import PNRG from './prng';
import { TETROS } from './Piece';
import * as dbg from '../../common/devLog';

const rng = new PNRG();
const permutations = 127;

/*
  Generate a 7-bag
  Get the tetronimos list, and perform random permutation
*/
export class RandomBag {
  constructor() {
    this._bag = Array.from(Object.keys(TETROS)).map(k => parseInt(k, 10));
    for (let i = 0; i < permutations; ++i) {
      const from = i % TETROS.length;
      const to = rng.rand(0, TETROS.length);
      const tmp = this._bag[from];
      this._bag[from] = this._bag[to];
      this._bag[to] = tmp;
    }
  }

  piece(i) {
    if (i >= this._bag.length) return null;
    return this._bag[i];
  }
}

export class Bag {
  constructor() {
    this._bag = [];
  }

  piece(id) {
    const bag = Math.floor(id / 7);
    const pos = id % 7;
    // New bag
    if (bag >= this._bag.length) {
      this._bag.push(new RandomBag());
    }
    return this._bag[bag].piece(pos);
  }
}
