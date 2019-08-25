import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

import createSocket from './middleware/socketMiddleWare';
import reducers from './reducers';
import ConnectedApp from './containers/App';


const hashRegex = /^#(.+)\[(.+)\]$/;
const matches = hashRegex.exec(window.location.hash);

const store = createStore(
  reducers,
  applyMiddleware(
    thunk,
    createSocket(),
    createLogger(),
  ),
);

ReactDom.render((
  <Provider store={store}>
    <ConnectedApp matches={matches} />
  </Provider>
), document.getElementById('root'));
