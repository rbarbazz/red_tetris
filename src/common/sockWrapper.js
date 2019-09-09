import * as dbg from './devLog';

function emitMessage(socket, type, data) {
  dbg.info(`${JSON.stringify(data, null, 2)}`);
  socket.emit(type, data);
}

export function sendError(socket, event, type, msg = '') {
  const msgType = `${type}_ERROR`;
  emitMessage(socket, event, {
    type: msgType,
    msg: [msg],
    payload: {},
  });
}

export function sendResponse(socket, event, type, payload, msg = []) {
  const msgType = `${type}_SUCCESS`;
  emitMessage(socket, event, {
    type: msgType,
    msg,
    payload,
  });
}

export function sendRequest(socket, event, type, payload, msg = []) {
  emitMessage(socket, event, {
    type,
    msg,
    payload,
  });
}
