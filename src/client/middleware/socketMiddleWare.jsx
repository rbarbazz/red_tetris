import io from 'socket.io-client';

import { SERVER_PONG } from '../actions/server';
import { STORE_PLAYER_NAME, VALIDATE_PLAYER_NAME } from '../actions/lobby';
import { NEXT_BOARD } from '../actions/board';

const clientOnlyActions = [
  SERVER_PONG,
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  NEXT_BOARD,
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
