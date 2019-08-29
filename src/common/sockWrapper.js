import * as dbg from './devLog';
import { eventType } from './enums';

function emitMessage(socket, type, data) {
  dbg.info(`${JSON.stringify(data, null, 2)}`);
  socket.emit(type, data);
}

export function sendError(socket, type, msg = '') {
  emitMessage(socket, eventType.SERVER_RESPOND, {
    type, error: true, msg,
  });
}

export function sendResponse(socket, type, payload) {
  emitMessage(socket, eventType.SERVER_RESPOND, {
    type, error: false, payload,
  });
}

export function sendRequest(socket, event, type, payload) {
  emitMessage(socket, event, {
    type, error: false, payload,
  });
}
