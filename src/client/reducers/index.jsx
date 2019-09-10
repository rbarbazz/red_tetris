import { combineReducers } from 'redux';

import game from './game';
import server from './server';
import tetris from './tetris';

const reducers = combineReducers({
  game,
  server,
  tetris,
});

export default reducers;
