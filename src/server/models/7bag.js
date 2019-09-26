import { TETROS } from './Piece';
import PNRG from '../controllers/prng';

const rng = new PNRG();
const permutations = 127;

export default class RandomBag {
  constructor() {
    this._bag = null;
    this._rand = () => rng.rand(0, TETROS.length);
    this._swap = (lst, a, b) => {
      const tmp = lst[a];
      lst[a] = lst[b];
      lst[b] = tmp;
    };
  }

  get bag() {
    return this._bag;
  }

  piece(i) {
    return this._bag[i];
  }

  /*
    Generate a 7-bag
    Get the tetronimos list, and perform random permutation
  */
  gen() {
    this._bag = Array.from(Object.keys(TETROS));
    for (let i = 0; i < permutations; ++i) {
      this._swap(this._bag, i % TETROS.length, this._rand());
    }
  }
}
