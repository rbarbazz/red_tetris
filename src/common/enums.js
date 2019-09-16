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
    GAME_START: 'GAME_READY', // Synchronize client to start the party, start the timer !
    GAME_TICK: 'GAME_TICK', // Tick to refresh the client
    GAME_END: 'GAME_END', // Party is over for the client, waiting for the report
    GAME_REPORT: 'GAME_REPORT', // Party is over, print scores
  },
};
