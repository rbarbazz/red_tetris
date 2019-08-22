import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA, GAME_DID_START } from '../actions/tetris';
import { VALIDATE_ROOM } from '../actions/lobby';

const initialState = {
  currentStep: 'loading',
  didGameStart: false,
  isRoomOwner: false,
  score: 0,
  spectrums: Array(7).fill([...Array(125).fill(0), ...Array(75).fill(1)]),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return { ...state, currentStep: 'lobby' };
    case VALIDATE_ROOM:
      return {
        ...state,
        currentStep: 'game',
        isRoomOwner: action.payload.isRoomOwner,
      };
    case VALIDATE_HASH_BASED_DATA:
      return {
        ...state,
        currentStep: 'game',
        isRoomOwner: action.payload.isRoomOwner,
      };
    case GAME_DID_START:
      return { ...state, didGameStart: true };
    default:
      return state;
  }
};

export default reducer;
