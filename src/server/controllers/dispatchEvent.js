import debug from 'debug';
import appData from '../models/Env';
import Player from '../models/Player';

// eslint-disable-next-line no-unused-vars
const logerror = debug('tetris:error');
export const loginfo = debug('tetris:info');

function onAction(socket, action) {
  if (action.type === 'CLIENT_PING') {
    socket.emit('action', { type: 'SERVER_PONG' });
  } else if (action.type === 'SUBMIT_PLAYER_NAME') {
    appData.players[socket.id] = new Player(action.payload.playerName, socket.id);
    socket.emit('action', {
      type: 'VALIDATE_PLAYER_NAME',
      payload: {
        playerName: appData.players[socket.id].name,
        currentRoomList: ['room1', 'room2', 'room3', 'room4', 'room5'],
      },
    });
  } else if (action.type === 'MOVE_TETRIMINO' && action.payload.event === 'keydown') {
    socket.emit('action', {
      type: 'NEXT_BOARD',
      payload: {
        board: [...Array(125).fill(0), ...Array(75).fill(1)],
      },
    });
  } else if (action.type === 'SUBMIT_ROOM') {
    socket.emit('action', {
      type: 'VALIDATE_ROOM',
      payload: {
        roomName: action.payload.roomName,
        isRoomOwner: true,
      },
    });
  } else if (action.type === 'SUBMIT_HASH_BASED_DATA') {
    socket.emit('action', {
      type: 'VALIDATE_HASH_BASED_DATA',
      payload: {
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
        isRoomOwner: true,
      },
    });
  } else if (action.type === 'OWNER_IS_READY') {
    socket.emit('action', { type: 'GAME_DID_START' });
  }
}

export default function dispatchEvent(io) {
  io.on('connect', (socket) => {
    loginfo(`Connect ${socket.id}`);
    socket.on('action', (action) => {
      loginfo(`Action ${socket.id}: ${JSON.stringify(action, null, 2)}`);
      onAction(socket, action);
    });
    socket.on('disconnect', (reason) => {
      loginfo(`Disconnect ${socket.id}: ${reason}`);
      switch (reason) {
        case 'server namespace disconnect':
          break;
        case 'client namespace disconnect':
          break;
        case 'ping timeout':
          break;
        case 'transport close':
          break;
        case 'transport error':
        default:
          break;
      }
    });
    socket.on('error', (error) => {
      loginfo(`Error ${socket.id}: ${error.message}`);
    });
  });
}
