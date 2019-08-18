import { SERVER_PONG } from '../actions/server';


const reducer = (state = { receivedPong: false }, action) => {
  switch (action.type) {
    case SERVER_PONG:
      return { receivedPong: true };
    default:
      return state;
  }
};

export default reducer;
