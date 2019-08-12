export const DISPLAY_LOBBY = 'DISPLAY_LOBBY';
export const SUBMIT_HASH_BASED_DATA = 'SUBMIT_HASH_BASED_DATA';
export const VALIDATE_HASH_BASED_DATA = 'VALIDATE_HASH_BASED_DATA';

export const displayLobby = () => ({
  type: DISPLAY_LOBBY,
});
export const submitHashBasedData = (playerName, roomName) => ({
  type: SUBMIT_HASH_BASED_DATA,
  payload: {
    playerName,
    roomName,
  },
});
