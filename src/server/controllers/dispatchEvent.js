import * as dbg from '../../common/devLog';
import { eventType, msgType, playerType } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

function onLobbyEvent(socket, data) {
  if (data.type === msgType.PING) {
    comm.sendRequest(socket, eventType.LOBBY, msgType.PONG, {});
  } else if (data.type === msgType.CLIENT.CONNECT_TO_LOBBY) {
    comm.sendResponse(socket, eventType.LOBBY, data.type, {
      playerName: data.payload.playerName,
    }, `Hey ${data.payload.playerName}`);
    comm.sendRequest(socket, eventType.LOBBY, msgType.SERVER.LOBBY_DATA, {
      currentRoomList: ['room1', 'room2', 'room3'],
    });
  } else if (data.type === msgType.CLIENT.JOIN_PARTY) {
    comm.sendResponse(socket, eventType.LOBBY, data.type, {
      roomName: data.payload.roomName,
      playerType: playerType.MASTER,
    }, `Joined/Created room ${data.payload.roomName}`);
  } else if (data.type === msgType.CLIENT.START_PARTY) {
    comm.sendResponse(socket, eventType.LOBBY, data.type, {});
  } else if (data.type === msgType.CLIENT.CONNECT_TO_PARTY) {
    comm.sendResponse(socket, eventType.LOBBY, data.type, {
      roomName: data.payload.roomName,
      playerName: data.payload.playerName,
      playerType: playerType.MASTER,
    });
  }
}

function onGameEvent(socket, data) {
  if (data.type === msgType.CLIENT.MOVE_TETRIMINO) {
    comm.sendRequest(socket, eventType.GAME, msgType.SERVER.GAME_TICK, {
      board: [...Array(125).fill(0), ...Array(75).fill(1)],
    });
  }
}

export default function dispatchEvent(io) {
  io.on('connect', (socket) => {
    dbg.info(`Connect ${socket.id}`);
    socket.on(eventType.LOBBY, (data) => {
      dbg.info(`Event ${eventType.LOBBY} from ${socket.id}: ${JSON.stringify(data, null, 2)}`);
      onLobbyEvent(socket, data);
    });
    socket.on(eventType.GAME, (data) => {
      dbg.info(`Event ${eventType.GAME} from ${socket.id}: ${JSON.stringify(data, null, 2)}`);
      onGameEvent(socket, data);
    });
    socket.on('disconnect', (reason) => {
      dbg.info(`Event disconnect from ${socket.id}: ${reason}`);
      switch (reason) {
        // Client problem, disconnect it
        case 'client namespace disconnect':
        case 'ping timeout':
          break;
        // Server problem, quit app
        case 'server namespace disconnect':
        case 'transport close':
        case 'transport error':
        default:
          break;
      }
    });
    // Error in communication with the client, disconnect it
    socket.on('error', (error) => {
      dbg.info(`Event error from ${socket.id}: ${error.message}`);
    });
  });
}