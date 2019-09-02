import io from 'socket.io-client';
import params from '../../../params';
import { eventType, msgType } from '../../common/enums';


const { server } = params;

export default () => {
  let socket;

  return ({ dispatch }) => next => (action) => {
    if (action.type === msgType.PING) {
      socket = io(server.url);

      // eslint-disable-next-line no-shadow
      socket.on(eventType.GAME, (action) => {
        dispatch({
          type: action.type,
          msg: action.msg,
          payload: action.payload,
        });
      });
      // eslint-disable-next-line no-shadow
      socket.on(eventType.LOBBY, (action) => {
        dispatch({
          type: action.type,
          msg: action.msg,
          payload: action.payload,
        });
      });
    }
    if (!action.type.includes('ERROR') || !action.type.includes('SUCCESS') || action.type !== msgType.PONG) {
      socket.emit(action.eventType, {
        type: action.type,
        msg: action.msg,
        payload: action.payload,
      });
    }
    return next(action);
  };
};

// Todo -> check if clientInit with action.type