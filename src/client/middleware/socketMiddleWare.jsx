import io from 'socket.io-client';
import params from '../../../params';

import { SERVER_PONG, CLIENT_PING, CLIENT_CLOSE } from '../actions/server';
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
const { server } = params;

export default () => {
  let socket;

  return ({ dispatch }) => next => (action) => {
    if (action.type === CLIENT_PING) {
      socket = io(server.url);

      // eslint-disable-next-line no-shadow
      socket.on('LOBBY', (action) => {
        dispatch({
          type: action.type,
          payload: action.payload,
        });
      });
    } else if (action.type === CLIENT_CLOSE) {
      socket.close();
    }
    if (!clientOnlyActions.includes(action.type)) {
      socket.emit('LOBBY', action);
    }
    return next(action);
  };
};
