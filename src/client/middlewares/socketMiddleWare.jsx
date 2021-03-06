import io from 'socket.io-client';
import params from '../../params';
import { eventType, msgType } from '../../common/enums';
import { sendRequest } from '../../common/sockWrapper';
import { DISPLAY_LOBBY } from '../actions/tetris';
import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';

const { server } = params;
const clientSideActions = [
  DISPLAY_LOBBY,
  STORE_PLAYER_NAME,
  STORE_ROOM,
];
const fromServerActions = [
  `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`,
  `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS`,
  `${msgType.CLIENT.CONNECT_TO_ROOM}_ERROR`,
  `${msgType.CLIENT.CONNECT_TO_ROOM}_SUCCESS`,
  `${msgType.CLIENT.JOIN_ROOM}_ERROR`,
  `${msgType.CLIENT.JOIN_ROOM}_SUCCESS`,
  `${msgType.CLIENT.RESET_ROOM}_SUCCESS`,
  `${msgType.CLIENT.START_PARTY}_ERROR`,
  `${msgType.CLIENT.START_PARTY}_SUCCESS`,
  msgType.DISCONNECT,
  msgType.PONG,
  msgType.SERVER.GAME_END,
  msgType.SERVER.GAME_REPORT,
  msgType.SERVER.GAME_START,
  msgType.SERVER.GAME_TICK,
  msgType.SERVER.LOBBY_DATA,
];

export default () => {
  let socket;

  return ({ dispatch, getState }) => next => (action) => {
    const currState = getState();
    if (action.type === msgType.PING && !currState.server.clientInit) {
      socket = io(server.url, { secure: true });

      Object.values(eventType).forEach((event) => {
        socket.on(event, (actionSent) => {
          dispatch({
            type: actionSent.type,
            msg: actionSent.msg,
            payload: actionSent.payload,
          });
        });
      });
    } else if (action.type === msgType.DISCONNECT) {
      socket.disconnect();
    }
    if (!clientSideActions.includes(action.type) && !fromServerActions.includes(action.type)) {
      const {
        eventType: event,
        type,
        payload,
        msg,
      } = action;
      sendRequest(socket, event, type, payload, msg);
    }
    return next(action);
  };
};
