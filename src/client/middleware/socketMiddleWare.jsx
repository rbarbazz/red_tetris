import io from 'socket.io-client';
import params from '../../../params';
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

export default () => {
  let socket;

  return ({ dispatch, getState }) => next => (action) => {
    const currState = getState();
    if (action.type === msgType.PING && !currState.server.clientInit) {
      socket = io(server.url);

      Object.values(eventType).forEach((event) => {
        // eslint-disable-next-line no-shadow
        socket.on(event, (action) => {
          dispatch({
            type: action.type,
            msg: action.msg,
            payload: action.payload,
          });
        });
      });
    }
    if (!action.type.includes('ERROR') || !action.type.includes('SUCCESS') || action.type !== msgType.PONG || action.type !== msgType.CLIENT.LOBBY_DATA || !clientSideActions.includes(action.type)) {
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
