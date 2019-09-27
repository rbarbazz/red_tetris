import { TETROS } from './Piece';
import PNRG from '../controllers/prng';
import * as dbg from '../../common/devLog';

const rng = new PNRG();
const permutations = 127;

/*
  Generate a 7-bag
  Get the tetronimos list, and perform random permutation
*/
export default class RandomBag {
  constructor() {
    this._bag = Array.from(Object.keys(TETROS));
    for (let i = 0; i < permutations; ++i) {
      const from = i % TETROS.length;
      const to = rng.rand(0, TETROS.length);
      const tmp = this._bag[from];
      this._bag[from] = this._bag[to];
      this._bag[to] = tmp;
    }
  }

  get bag() {
    return this._bag;
  }

  piece(i) {
    return this._bag[i];
  }
}
