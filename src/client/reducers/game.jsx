import { msgType } from '../../common/enums';

const initialState = {
  board: Array(20).fill(Array(10).fill(0)),
  nextPiece: 'O',
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
        nextPiece: action.payload.nextPiece,
        spectrums: spectrums.length > 0 ? spectrums : state.spectrums,
        score: action.payload.score,
      };
    }
    default:
      return state;
  }
};

export default reducer;
