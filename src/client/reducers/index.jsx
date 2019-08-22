import { combineReducers } from 'redux';

import board from './board';
import lobby from './lobby';
import server from './server';
import tetris from './tetris';

const reducers = combineReducers({
  board,
  lobby,
  server,
  tetris,
});

export default reducers;
