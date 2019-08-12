import io from 'socket.io-client';

import { SERVER_PONG } from '../actions/server';
import {
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  STORE_ROOM,
  VALIDATE_ROOM,
} from '../actions/lobby';
import { NEXT_BOARD } from '../actions/board';
import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA } from '../actions/tetris';

const clientOnlyActions = [
  DISPLAY_LOBBY,
  SERVER_PONG,
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  NEXT_BOARD,
  STORE_ROOM,
  VALIDATE_ROOM,
  VALIDATE_HASH_BASED_DATA,
];

const socketMiddleWare = url => (
  (storeAPI) => {
    const socket = io(url);

    socket.on('action', (action) => {
      storeAPI.dispatch({
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

export default socketMiddleWare;
