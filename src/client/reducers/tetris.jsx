import {
  STORE_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  STORE_ROOM,
  VALIDATE_ROOM,
} from '../actions/lobby';

const initialState = {
  tetrisCurrentStep: 'lobby',
  lobbyCurrentStep: 'playerNameSelection',
  playerName: '',
  roomSelected: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLAYER_NAME:
      return Object.assign({}, state, {
        playerName: action.payload.playerName,
      });
    case VALIDATE_PLAYER_NAME:
      return Object.assign({}, state, {
        lobbyCurrentStep: 'roomSelection',
        playerName: action.payload.playerName,
        currentRoomList: action.payload.currentRoomList,
      });
    case STORE_ROOM:
      return Object.assign({}, state, {
        roomSelected: action.payload.roomSelected,
      });
    case VALIDATE_ROOM:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'game',
        roomSelected: action.payload.roomSelected,
      });

    default:
      return state;
  }
};

export default reducer;
