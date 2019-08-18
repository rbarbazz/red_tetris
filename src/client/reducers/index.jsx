import { combineReducers } from 'redux';
import tetris from './tetris';
import board from './board';
import server from './server';

const reducer = combineReducers({ board, tetris, server });

export default reducer;
