import * as dbg from '../../common/devLog';
import { eventType, msgType } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

function onLobbyEvent(sock, data) {
  if (data.type === msgType.PINGPONG) {
    comm.sendRespond(sock, data.type, { msg: 'Hello world !' });
  } else if (data.type === msgType.CLIENT.CONNECT_WITH_NAME) {
    comm.sendResponse(sock, data.type, { msg: `Hey ${data.payload.playerName}` });
  }
}

function onGameEvent(socket, data) {
  // board: [...Array(125).fill(0), ...Array(75).fill(1)],
}

export default function dispatchEvent(io) {
  io.on('connect', (socket) => {
    dbg.info(`Connect ${socket.id}`);
    socket.on(eventType.LOBBY, (data) => {
      dbg.info(`Event ${eventType.GAME} from ${socket.id}: ${JSON.stringify(data, null, 2)}`);
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
