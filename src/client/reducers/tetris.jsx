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
  didGameStart: false,
  isRoomOwner: false,
  lobbyCurrentStep: 'playerNameSelection',
  playerName: '',
  roomName: '',
  score: 0,
  spectrums: Array(7).fill([...Array(125).fill(0), ...Array(75).fill(1)]),
  tetrisCurrentStep: 'loading',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'lobby',
      });
    case STORE_PLAYER_NAME:
      return Object.assign({}, state, {
        playerName: action.payload.playerName,
      });
    case SUBMIT_PLAYER_NAME:
      return Object.assign({}, state, {
        lobbyCurrentStep: 'loading',
      });
    case VALIDATE_PLAYER_NAME:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'lobby',
        lobbyCurrentStep: 'roomSelection',
        playerName: action.payload.playerName,
        currentRoomList: action.payload.currentRoomList,
      });
    case STORE_ROOM:
      return Object.assign({}, state, {
        roomName: action.payload.roomName,
      });
    case SUBMIT_ROOM:
      return Object.assign({}, state, {
        lobbyCurrentStep: 'loading',
      });
    case VALIDATE_ROOM:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'game',
        roomName: action.payload.roomName,
        isRoomOwner: action.payload.isRoomOwner,
      });
    case VALIDATE_HASH_BASED_DATA:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'game',
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
        isRoomOwner: action.payload.isRoomOwner,
      });
    case GAME_DID_START:
      return Object.assign({}, state, {
        didGameStart: true,
      });
    default:
      return state;
  }
};

export default reducer;
