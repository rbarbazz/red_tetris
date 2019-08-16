export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const SUBMIT_PLAYER_NAME = 'SUBMIT_PLAYER_NAME';
export const VALIDATE_PLAYER_NAME = 'VALIDATE_PLAYER_NAME';
export const STORE_ROOM = 'STORE_ROOM';
export const SUBMIT_ROOM = 'SUBMIT_ROOM';
export const VALIDATE_ROOM = 'VALIDATE_ROOM';

export const handlePlayerName = playerName => ({
  type: STORE_PLAYER_NAME,
  payload: { playerName },
});

export const submitPlayerName = playerName => ({
  type: SUBMIT_PLAYER_NAME,
  payload: { playerName },
});

export const handleRoomSelection = roomName => ({
  type: STORE_ROOM,
  payload: { roomName },
});

export const submitRoom = roomName => ({
  type: SUBMIT_ROOM,
  payload: { roomName },
});
