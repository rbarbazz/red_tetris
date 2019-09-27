import { msgType } from '../../common/enums';

const initialState = {
  board: Array(20).fill(Array(10).fill(0)),
  score: 0,
  spectrums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case msgType.SERVER.GAME_TICK:
      return action.payload.board;
    default:
      return state;
  }
};

export default reducer;
