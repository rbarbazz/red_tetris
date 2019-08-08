import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import socketMiddleWare from './middleware/socketMiddleWare';
import reducer from './reducers';
import App from './containers/app';


const store = createStore(
  reducer,
  applyMiddleware(thunk, socketMiddleWare('http://0.0.0.0:3004/'), createLogger()),
);

ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
