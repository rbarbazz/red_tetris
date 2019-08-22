import {
  STORE_PLAYER_NAME,
  STORE_ROOM,
  SUBMIT_PLAYER_NAME,
  SUBMIT_ROOM,
  VALIDATE_PLAYER_NAME,
  VALIDATE_ROOM,
} from '../actions/lobby';
import { VALIDATE_HASH_BASED_DATA } from '../actions/tetris';


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
    case SUBMIT_PLAYER_NAME:
      return { ...state, currentStep: 'loading' };
    case VALIDATE_PLAYER_NAME:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        playerName: action.payload.playerName,
        currentRoomList: action.payload.currentRoomList,
      };
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
    case SUBMIT_ROOM:
      return { ...state, currentStep: 'loading' };
    case VALIDATE_ROOM:
      return {
        ...state,
        roomName: action.payload.roomName,
      };
    case VALIDATE_HASH_BASED_DATA:
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
