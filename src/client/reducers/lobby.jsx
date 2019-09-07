import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType } from '../../common/enums';

const initialState = {
  currentRoomList: [],
  currentStep: 'playerNameSelection',
  playerName: '',
  roomName: '',
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_PLAYER_NAME:
      return {
        ...state,
        playerName: action.payload.playerName,
        errorMessage: '',
      };
    case msgType.CLIENT.CONNECT_TO_LOBBY:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        playerName: action.payload.playerName,
        errorMessage: '',
      };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`:
      return {
        ...state,
        currentStep: 'playerNameSelection',
        errorMessage: action.msg,
      };
    case msgType.SERVER.LOBBY_DATA:
      return {
        ...state,
        currentRoomList: action.payload.rooms,
      };
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
    case msgType.CLIENT.JOIN_ROOM:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.JOIN_ROOM}_SUCCESS`:
      return {
        ...state,
        roomName: action.payload.roomName,
      };
    case `${msgType.CLIENT.JOIN_ROOM}_ERROR`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        errorMessage: action.msg,
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
