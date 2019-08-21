import io from 'socket.io-client';

import { SERVER_PONG } from '../actions/server';
import {
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  STORE_ROOM,
  VALIDATE_ROOM,
} from '../actions/lobby';
import { NEXT_BOARD } from '../actions/board';
import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA, GAME_DID_START } from '../actions/tetris';

const clientOnlyActions = [
  DISPLAY_LOBBY,
  SERVER_PONG,
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  NEXT_BOARD,
  STORE_ROOM,
  VALIDATE_ROOM,
  VALIDATE_HASH_BASED_DATA,
  GAME_DID_START,
];

export default url => (
  ({ dispatch }) => {
    const socket = io(url);

    socket.on('action', (action) => {
      dispatch({
        type: action.type,
        payload: action.payload,
      });
    });

    return next => (action) => {
      if (!clientOnlyActions.includes(action.type)) {
        socket.emit('action', action);
      }
      return next(action);
    };
  }
);
