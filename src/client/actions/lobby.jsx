export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const SUBMIT_PLAYER_NAME = 'SUBMIT_PLAYER_NAME';

export const handlePlayerName = event => ({
  type: STORE_PLAYER_NAME,
  playerName: event.target.value,
});

export const submitPlayerName = () => ({
  type: SUBMIT_PLAYER_NAME,
});
