import { DISPLAY_LOBBY } from '../actions/tetris';
import { msgType } from '../../common/enums';

const initialState = {
  currentStep: 'loading',
  didGameStart: false,
  score: 0,
  spectrums: Array(7).fill([...Array(125).fill(0), ...Array(75).fill(1)]),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return { ...state, currentStep: 'lobby' };
    case `${msgType.CLIENT.START_PARTY}_SUCCESS`:
      return {
        ...state,
        currentStep: 'game',
        didGameStart: true,
      };
    case `${msgType.CLIENT.LEAVE_ROOM}_SUCCESS`:
      return {
        ...state,
        currentStep: 'lobby',
      };
    default:
      return state;
  }
};

export default reducer;
