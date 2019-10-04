import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType } from '../../common/enums';
import {
  sendLobbyToClients, clientDisconnect,
  clientConnectLobby, clientConnectRoom,
  clientJoinRoom, clientLeaveRoom,
  clientStartParty, clientResetRoom,
} from './clientConnect';
import { gameStart } from './gameStart';
import { gameInput } from './gameInput';

function onLobbyEvent(socket, data) {
  if (data.type === msgType.PING) {
    comm.sendRequest(socket, eventType.LOBBY, msgType.PONG, {});
  } else if (data.type === msgType.CLIENT.CONNECT_TO_LOBBY) {
    clientConnectLobby(socket, data);
  } else if (data.type === msgType.CLIENT.CONNECT_TO_ROOM) {
    clientConnectRoom(socket, data);
  } else if (data.type === msgType.CLIENT.JOIN_ROOM) {
    clientJoinRoom(socket, data);
  } else if (data.type === msgType.CLIENT.LEAVE_ROOM) {
    clientLeaveRoom(socket, data);
  } else if (data.type === msgType.CLIENT.START_PARTY) {
    const r = clientStartParty(socket, data);
    if (r !== false) {
      gameStart(r);
    }
  } else if (data.type === msgType.CLIENT.DISCONNECT) {
    clientDisconnect(socket, data);
  } else if (data.type === msgType.CLIENT.RESET_ROOM) {
    clientResetRoom(socket, data);
  } else {
    dbg.error(`Unknown msgType: ${data.type}`);
  }
  return true;
}

function onGameEvent(socket, data) {
  if (data.type === msgType.CLIENT.GAME_INPUT) {
    gameInput(socket, data);
  }
  return true;
}

export default function dispatchEvent(io) {
  io.on('connect', (socket) => {
    dbg.info(`Connect ${socket.id}`);
    socket.on(eventType.LOBBY, (data) => {
      dbg.info(`Event ${eventType.LOBBY} from ${socket.id}: ${JSON.stringify(data, null, 2)}`);
      onLobbyEvent(socket, data);
      sendLobbyToClients();
    });
    socket.on(eventType.GAME, (data) => {
      onGameEvent(socket, data);
      sendLobbyToClients();
    });
    socket.on('disconnect', (reason) => {
      dbg.info(`Event disconnect from ${socket.id}: ${reason}`);
      switch (reason) {
        case 'client namespace disconnect':
        case 'ping timeout':
        case 'server namespace disconnect':
        case 'transport close':
        case 'transport error':
        default:
          clientDisconnect(socket);
          sendLobbyToClients();
          break;
      }
    });
    // Error in communication with the client, disconnect it
    socket.on('error', (error) => {
      dbg.info(`Event error from ${socket.id}: ${error.message}`);
    });
  });
}
