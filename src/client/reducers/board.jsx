import { BOARD_SPACE } from '../actions/board';

const reducer = (state = new Array(200).fill(0), action) => {
  switch (action.type) {
    case BOARD_SPACE:
      return new Array(200).fill().map(() => Math.round(Math.random() * 7));
    default:
      return state;
  }
};

export default reducer;
