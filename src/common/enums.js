/*
- Quand le client envoie une requête au serveur -> il attend systématiquement une réponse
- Quand le serveur envoie une requête -> il n'attend PAS de réponse du client
- La réponse du serveur est: event SERVER_RESPONSE
  - Cas échec: type ERROR + error message
  - Cas succès: type SUCCESS + payload demandé

Event MSG {
  type: msgType,          -> optional suffix _ERROR or _SUCCESS on response
  message: string,        -> message to print to client (even if no error, can be usefull)
  payload: object         -> data requested by client
}

Payload:
Type CONNECT_TO_LOBBY {
  playerName: string  -> Nickname choosen  by the client
}

Type JOIN_PARTY {
  roomName: string    -> Create the room if needed, then join if there is a free slot
}

Type LOBBY_DATA {
  rooms: [{name, [slotTaken, slotMax], state, players = [name, ...] }, ...]
  players: [name, ...],
}


*/

export const CONFIG = {
  MAX_SLOT: 64,
  NAME_MIN: 2,
  NAME_MAX: 16,
  MAX_ROOM: 8,
  SLOTS_PER_ROOM: 8,
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
    CONNECT_TO_LOBBY: 'CONNECT_TO_LOBBY', // Connect to lobby with a nickname
    JOIN_ROOM: 'JOIN_ROOM', // Join a party (create/join/spectator)
    LEAVE_ROOM: 'LEAVE_ROOM', // Leave a room
    CONNECT_TO_ROOM: 'CONNECT_TO_ROOM', // Direct connection to a party
    START_PARTY: 'START_PARTY', // Only for master
    LEAVE_PARTY: 'LEAVE_PARTY', // Anyone
    MOVE_TETRIMINO: 'MOVE_TETRIMINO', // Send an input to the server
  },
  // only sent by server to clients
  SERVER: {
    LOBBY_DATA: 'LOBBY_DATA', // Retrieve lobby informations
    DISCONNECT_CLIENT: 'DISCONNECT_CLIENT',
    GAME_INIT: 'GAME_INIT',
    GAME_TICK: 'GAME_TICK',
    GAME_END: 'GAME_END',
    GAME_REPORT: 'GAME_REPORT',
  },
};
