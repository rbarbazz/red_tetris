import {
  STORE_PLAYER_NAME,
  SUBMIT_PLAYER_NAME,
  VALIDATE_PLAYER_NAME,
  STORE_ROOM,
  SUBMIT_ROOM,
  VALIDATE_ROOM,
} from '../actions/lobby';
import { SERVER_PONG } from '../actions/server';
import { DISPLAY_LOBBY, VALIDATE_HASH_BASED_DATA } from '../actions/tetris';

const initialState = {
  receivedPong: false,
  didGameStart: false,
  tetrisCurrentStep: 'loading',
  lobbyCurrentStep: 'playerNameSelection',
  playerName: '',
  roomName: '',
  score: 0,
  spectrums: [
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
    [...new Array(75).fill(0), ...new Array(125).fill().map(() => Math.round(Math.random() * 1))],
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVER_PONG:
      return Object.assign({}, state, {
        receivedPong: true,
      });
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
        tetrisCurrentStep: 'loading',
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
        tetrisCurrentStep: 'loading',
      });
    case VALIDATE_ROOM:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'game',
        roomName: action.payload.roomName,
      });
    case VALIDATE_HASH_BASED_DATA:
      return Object.assign({}, state, {
        tetrisCurrentStep: 'game',
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
      });
    default:
      return state;
  }
};

export default reducer;
