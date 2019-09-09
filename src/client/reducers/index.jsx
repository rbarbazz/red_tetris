import { combineReducers } from 'redux';

import board from './board';
import server from './server';
import tetris from './tetris';

const reducers = combineReducers({
  board,
  server,
  tetris,
});

export default reducers;
