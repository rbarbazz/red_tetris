function emitMessage(socket, type, data) {
  socket.emit(type, data);
}

export function sendError(socket, event, type, msg = '') {
  const msgType = `${type}_ERROR`;
  emitMessage(socket, event, {
    type: msgType,
    msg,
    payload: {},
  });
}

export function sendResponse(socket, event, type, payload = {}) {
  const msgType = `${type}_SUCCESS`;
  emitMessage(socket, event, {
    type: msgType,
    msg: [],
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
