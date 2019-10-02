/*
- Quand le client envoie une requête au serveur -> il attend systématiquement une réponse
- Quand le serveur envoie une requête -> il n'attend PAS de réponse du client

Event MSG {
  type: msgType,          -> optional suffix _ERROR/_SUCCESS on response
  msg: string,            -> message to print in error/timeline on response
  payload: object         -> data requested by client
}

Payload examples:
  playerName, roomName,

*/

export const CONFIG = {
  MAX_SLOT: 64,
  NAME_MIN: 2,
  NAME_MAX: 15,
  MAX_ROOM: 8,
  SLOTS_PER_ROOM: 8,
  COOLDOWN: 6666, // In microseconds
  LOCK_COOLDOWN: 500,
  FALL_SPEED: 16.7,
  DEFAULT_SPEED: 700,
  START_DELAY: 1000, // ms
  LEADERBOARD_FILE: '../../leaderboard.json',
};

export const GAME_TYPE = {
  CLASSIC: 'CLASSIC',
  TOURNAMENT: 'TOURNAMENT',
};

export const GAME_SPEED = {
  SUPERSLOW: 1.25,
  SLOW: 1.0,
  NORMAL: 0.8,
  FAST: 0.6,
  SUPERFAST: 0.33,
};

export const KEYS = {
  SPACE: 'SPACE',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

// Type of player when he join a party
export const playerType = {
  NONE: 'none',
  MASTER: 'master',
  SLAVE: 'slave',
  SPECTATOR: 'spectator',
};

export const roomState = {
  FREE: 'FREE',
  BUSY: 'BUSY',
};

// Socket.io custom type of message socket.on(eventType)
export const eventType = {
  GAME: 'GAME',
  LOBBY: 'LOBBY',
};

export const msgType = {
  // Common type (2-way)
  PING: 'PING',
  PONG: 'PONG',
  DISCONNECT: 'DISCONNECT',
  // only sent by client to server
  CLIENT: {
    // LOBBY event
    CONNECT_TO_LOBBY: 'CONNECT_TO_LOBBY', // Connect to lobby with a nickname
    CONNECT_TO_ROOM: 'CONNECT_TO_ROOM', // Direct connection to a party
    JOIN_ROOM: 'JOIN_ROOM', // Join a party (create/join/spectator)
    LEAVE_ROOM: 'LEAVE_ROOM', // Leave a room
    START_PARTY: 'START_PARTY', // Only for master
    RESET_ROOM: 'RESET_ROOM', // Only for master
    // GAME event
    GAME_INPUT: 'GAME_INPUT', // Send an input to the server
  },
  // only sent by server to clients
  SERVER: {
    // LOBBY event
    LOBBY_DATA: 'LOBBY_DATA', // Retrieve lobby informations
    // GAME event (doesn't need an answer)
    GAME_START: 'GAME_START', // Synchronize client to start the party, start the timer !
    GAME_TICK: 'GAME_TICK', // Tick to refresh the client
    GAME_END: 'GAME_END', // Party is over for the client, waiting for the report
    GAME_REPORT: 'GAME_REPORT', // Party is over, print scores
  },
};

export const TETROS_SHAPE = {
  O: [['11', '11'], ['11', '11'], ['11', '11'], ['11', '11']],
  I: [
    ['0000', '1111', '0000', '0000'],
    ['0010', '0010', '0010', '0010'],
    ['0000', '0000', '1111', '0000'],
    ['0100', '0100', '0100', '0100'],
  ],
  T: [
    ['010', '111', '000'],
    ['010', '011', '010'],
    ['000', '111', '010'],
    ['010', '110', '010'],
  ],
  L: [
    ['001', '111', '000'],
    ['010', '010', '011'],
    ['000', '111', '100'],
    ['110', '010', '010'],
  ],
  J: [
    ['100', '111', '000'],
    ['011', '010', '010'],
    ['000', '111', '001'],
    ['010', '010', '110'],
  ],
  Z: [
    ['110', '011', '000'],
    ['001', '011', '010'],
    ['000', '110', '011'],
    ['010', '110', '100'],
  ],
  S: [
    ['011', '110', '000'],
    ['010', '011', '001'],
    ['000', '011', '110'],
    ['100', '110', '010'],
  ],
};
