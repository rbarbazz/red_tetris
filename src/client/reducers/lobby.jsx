import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType } from '../../common/enums';

const initialState = {
  currentRoomList: [],
  currentStep: 'playerNameSelection',
  playerName: '',
  roomName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLAYER_NAME:
      return { ...state, playerName: action.payload.playerName };
    case msgType.CLIENT.CONNECT_TO_LOBBY:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS`:
      return {
        ...state,
        playerName: action.payload.playerName,
      };
    case msgType.SERVER.LOBBY_DATA:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        currentRoomList: action.payload.currentRoomList,
      };
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
    case msgType.CLIENT.JOIN_PARTY:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.JOIN_PARTY}_SUCCESS`:
      return {
        ...state,
        roomName: action.payload.roomName,
      };
    case `${msgType.CLIENT.CONNECT_TO_PARTY}_SUCCESS`:
      return {
        ...state,
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
      };
    default:
      return state;
  }
};

export default reducer;
