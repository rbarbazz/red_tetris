import { expect } from 'chai';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';

import createSocket from '../../src/client/middleware/socketMiddleWare';
import * as serverActions from '../../src/client/actions/server';

export default () => describe('Middleware', () => {
  let mockConsoleError;
  before(() => {
    mockConsoleError = sinon.spy(console, 'error');
  });

  after(() => {
    mockConsoleError.restore();
  });

  it('should get actions passed through', () => {
    const store = createStore(() => ({}), applyMiddleware(createSocket()));

    store.dispatch({ type: serverActions.CLIENT_PING });
    store.dispatch({ type: serverActions.SERVER_PONG });
    store.dispatch({ type: serverActions.CLIENT_CLOSE });
    expect(mockConsoleError).to.have.property('callCount', 0);
  });
});
