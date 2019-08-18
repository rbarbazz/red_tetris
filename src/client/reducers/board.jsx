import { NEXT_BOARD } from '../actions/board';


const reducer = (state = new Array(200).fill(0), action) => {
  switch (action.type) {
    case NEXT_BOARD:
      return action.payload.board;
    default:
      return state;
  }
};

export default reducer;
