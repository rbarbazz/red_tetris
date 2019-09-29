import { expect } from 'chai';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';

import { msgType } from '../../src/common/enums';
import createSocket from '../../src/client/middleware/socketMiddleWare';

export default () => describe('Middleware', () => {
  let mockConsoleError;
  before(() => {
    mockConsoleError = sinon.spy(console, 'error');
  });

  after(() => {
    mockConsoleError.restore();
  });

  it('should get actions passed through', () => {
    const store = createStore(() => ({
      server: {
        clientInit: false,
      },
    }), applyMiddleware(createSocket()));

    store.dispatch({ type: msgType.PING });
    store.dispatch({ type: msgType.PONG });
    store.dispatch({ type: msgType.DISCONNECT });
    expect(mockConsoleError).to.have.property('callCount', 0);
  });
});
