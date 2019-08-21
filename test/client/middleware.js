import { expect } from 'chai';
import { describe, it } from 'mocha';

import socketMiddleWare from '../../src/client/middleware/socketMiddleWare';

export default () => describe('Middleware', () => {
  it('should pass the intercepted action to next', () => {
    const ret = socketMiddleWare('http://0.0.0.0:3004/');

    expect(ret).to.be.instanceOf(Function);
  });
});
