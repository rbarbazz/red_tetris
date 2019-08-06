export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const SUBMIT_PLAYER_NAME = 'SUBMIT_PLAYER_NAME';

export const handlePlayerName = (event) => {
  const playerName = event.target.value;

  return ({
    type: STORE_PLAYER_NAME,
    playerName,
  });
};

export const submitPlayerName = (event) => {
  event.preventDefault();

  return ({
    type: SUBMIT_PLAYER_NAME,
  });
};
