import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import socketMiddleWare from './middleware/socketMiddleWare';
import reducers from './reducers';
import ConnectedApp from './containers/App';


const hashRegex = /^#(.+)\[(.+)\]$/;
const matches = hashRegex.exec(window.location.hash);

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    socketMiddleWare('http://0.0.0.0:3004/'),
    createLogger(),
  ),
);

ReactDom.render((
  <Provider store={store}>
    <ConnectedApp matches={matches} />
  </Provider>
), document.getElementById('root'));
