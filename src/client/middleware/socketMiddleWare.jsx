import io from 'socket.io-client';

const socketMiddleWare = url => (
  (storeAPI) => {
    const socket = io(url);

    socket.on('action', (action) => {
      storeAPI.dispatch({
        type: action.type,
      });
    });

    return next => (action) => {
      socket.emit('action', action);
      return next(action);
    };
  }
);

export default socketMiddleWare;
