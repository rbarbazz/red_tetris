import { RAND_COLOR } from '../actions/board';

const reducer = (state = new Array(200).fill(0), action) => {
  switch (action.type) {
    case RAND_COLOR:
      return action.boardArr;
    default:
      return state;
  }
};

export default reducer;
