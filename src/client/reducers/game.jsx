import { msgType } from '../../common/enums';


const initialState = {
  board: Array(20).fill(Array(10).fill(0)),
  gameReport: [],
  nextPiece: 'O',
  score: {
    lines: 0,
    lvl: 1,
    pts: 0,
  },
  spectrums: [],
  startTimer: 3000,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case msgType.SERVER.GAME_START:
      return {
        ...initialState,
        nextPiece: action.payload.nextPiece,
        startTimer: action.payload.timer,
      };
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
    case msgType.SERVER.GAME_REPORT:
      return { ...state, gameReport: action.payload.report };
    default:
      return state;
  }
};

export default reducer;
