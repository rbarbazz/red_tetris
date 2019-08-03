import alert from './alert';
import board from './board';


const reducer = (state = {}, action) => ({
  alert: alert(state.alert, action),
  board: board(state.board, action),
});

export default reducer;
