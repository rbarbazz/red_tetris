import { expect } from 'chai';

import * as clientConnect from '../../src/server/controllers/clientConnect';
import * as dispatchEvent from '../../src/server/controllers/dispatchEvent';
import * as gameInput from '../../src/server/controllers/gameInput';
import * as gameStart from '../../src/server/controllers/gameStart';
import * as prng from '../../src/server/controllers/prng';
import * as srs from '../../src/server/controllers/srs';
import * as time from '../../src/server/controllers/time';


export default () => describe('Controllers', () => {
  it('should', () => {
    expect(1).to.equal(1);
  });
});
