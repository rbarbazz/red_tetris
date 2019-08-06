import { combineReducers } from 'redux';
import tetris from './tetris';
import board from './board';

const reducer = combineReducers({ board, tetris });

export default reducer;
