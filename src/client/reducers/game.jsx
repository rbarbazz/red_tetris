import { msgType } from '../../common/enums';

const initialState = {
  board: Array(20).fill(Array(10).fill(0)),
  score: 0,
  spectrums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case msgType.SERVER.GAME_TICK: {
      const { spectrums } = action.payload;
      return {
        ...state,
        board: action.payload.board,
        spectrums: spectrums.length > 0 ? spectrums : state.spectrums,
      };
    }
    default:
      return state;
  }
};

export default reducer;
