export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const SUBMIT_PLAYER_NAME = 'SUBMIT_PLAYER_NAME';
export const VALIDATE_PLAYER_NAME = 'VALIDATE_PLAYER_NAME';

export const handlePlayerName = event => ({
  type: STORE_PLAYER_NAME,
  payload: { playerName: event.target.value },
});

export const submitPlayerName = playerName => ({
  type: SUBMIT_PLAYER_NAME,
  payload: { playerName },
});
