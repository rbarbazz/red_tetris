
// Type of player when he join a party
export const playerType = {
  NONE: 'none',
  MASTER: 'master',
  SLAVE: 'slave',
  SPECTATOR: 'spectator',
};

// Socket.io custom type of message (socket.on(eventType)
export const eventType = {
  ACTION: 'action',
};

export const msgType = {
  // Common type (2-way)
  PING: 'PING',
  PONG: 'PONG',
  DISCONNECT: 'DISCONNECT',
  // only sent by client to server
  CLIENT: {
    CONNECT: 'CONNECT',
    GET_ROOMS: 'GET_ROOMS',
    CREATE_ROOM: 'CREATE_ROOM',
    JOIN_ROOM: 'JOIN_ROOM',
  },
  // only sent by server to clients
  SERVER: {
    CONNECTED: 'CONNECTION_ALLOWED',
    ROOM_LIST: 'ROOM_LIST',
    ROOM_CREATED: 'ROOM_CREATED',
    ROOM_JOINED: 'ROOM_JOINED',
  },
};

export const MOVE_TETRIMINO = 'MOVE_TETRIMINO';
export const NEXT_BOARD = 'NEXT_BOARD';

export const SUBMIT_PLAYER_NAME = 'SUBMIT_PLAYER_NAME';
export const VALIDATE_PLAYER_NAME = 'VALIDATE_PLAYER_NAME';
export const STORE_ROOM = 'STORE_ROOM';
export const SUBMIT_ROOM = 'SUBMIT_ROOM';
export const VALIDATE_ROOM = 'VALIDATE_ROOM';


export const OWNER_IS_READY = 'OWNER_IS_READY';
export const GAME_DID_START = 'GAME_DID_START';
