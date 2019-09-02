import { msgType } from '../../common/enums';

const reducer = (state = Array(200).fill(0), action) => {
  switch (action.type) {
    case msgType.SERVER.GAME_TICK:
      return action.payload.board;
    default:
      return state;
  }
};

export default reducer;
