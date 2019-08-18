import {
  STORE_PLAYER_NAME,
  STORE_ROOM,
  SUBMIT_PLAYER_NAME,
  SUBMIT_ROOM,
  VALIDATE_PLAYER_NAME,
  VALIDATE_ROOM,
} from '../actions/lobby';
import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA, GAME_DID_START } from '../actions/tetris';

const initialState = {
  currentStep: 'loading',
  didGameStart: false,
  isRoomOwner: false,
  playerName: '',
  roomName: '',
  score: 0,
  spectrums: Array(7).fill([...Array(125).fill(0), ...Array(75).fill(1)]),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return { ...state, currentStep: 'playerNameSelection' };
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
        currentStep: 'game',
        roomName: action.payload.roomName,
        isRoomOwner: action.payload.isRoomOwner,
      };
    case VALIDATE_HASH_BASED_DATA:
      return {
        ...state,
        currentStep: 'game',
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
        isRoomOwner: action.payload.isRoomOwner,
      };
    case GAME_DID_START:
      return { ...state, didGameStart: true };
    default:
      return state;
  }
};

export default reducer;
