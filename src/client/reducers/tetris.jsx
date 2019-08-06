import { STORE_PLAYER_NAME, SUBMIT_PLAYER_NAME } from '../actions/lobby';

const initialState = {
  currentStep: 'lobby',
  playerName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLAYER_NAME:
      return Object.assign({}, state, {
        playerName: action.playerName,
      });
    case SUBMIT_PLAYER_NAME:
      return Object.assign({}, state, {
        currentStep: 'game',
      });
    default:
      return state;
  }
};

export default reducer;
