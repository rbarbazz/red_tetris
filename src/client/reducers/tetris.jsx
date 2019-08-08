import { STORE_PLAYER_NAME, VALIDATE_PLAYER_NAME } from '../actions/lobby';

const initialState = {
  currentStep: 'lobby',
  playerName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLAYER_NAME:
      return Object.assign({}, state, {
        playerName: action.payload.playerName,
      });
    case VALIDATE_PLAYER_NAME:
      return Object.assign({}, state, {
        currentStep: 'game',
        playerName: action.payload.playerName,
      });
    default:
      return state;
  }
};

export default reducer;
