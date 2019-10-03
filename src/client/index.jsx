import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createSocket from './middlewares/socketMiddleWare';
import reducers from './reducers';
import ConnectedApp from './containers/App';


const hashRegex = /^#(.+)\[(.+)\]$/;
const matches = hashRegex.exec(window.location.hash);

let middlewares;
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const createLogger = require('redux-logger');
  middlewares = [thunk, createSocket(), createLogger.createLogger()];
} else {
  middlewares = [thunk, createSocket()];
}

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

ReactDom.render((
  <Provider store={store}>
    <ConnectedApp matches={matches} />
  </Provider>
), document.getElementById('root'));
