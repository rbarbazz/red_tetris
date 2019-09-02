import { msgType } from '../../common/enums';


const reducer = (state = { clientInit: false }, action) => {
  switch (action.type) {
    case msgType.PONG:
      return { clientInit: true };
    default:
      return state;
  }
};

export default reducer;
