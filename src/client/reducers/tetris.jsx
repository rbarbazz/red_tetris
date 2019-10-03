import { DISPLAY_LOBBY } from '../actions/tetris';
import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import {
  GAME_TYPE,
  msgType,
  playerType,
  roomState,
} from '../../common/enums';


const initialState = {
  currentPlayerType: playerType.NONE,
  currentStep: 'loading',
  isInRoom: false,
  isLoading: false,
  message: '',
  playerList: [],
  playerName: '',
  roomList: [],
  roomName: '',
  roomGameMode: GAME_TYPE.CLASSIC,
  roomObject: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return { ...state, currentStep: 'playerNameSelection' };
    case STORE_PLAYER_NAME:
      return {
        ...state,
        message: '',
        playerName: action.payload.playerName,
      };
    case msgType.CLIENT.CONNECT_TO_LOBBY:
      return { ...state, isLoading: true };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_SUCCESS`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        isInRoom: false,
        isLoading: false,
        message: '',
        roomName: '',
        roomObject: undefined,
      };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`:
      return {
        ...state,
        currentStep: 'playerNameSelection',
        isLoading: false,
        message: action.msg,
      };
    case msgType.SERVER.LOBBY_DATA: {
      const playerObject = action.payload.players.find(player => player.name === state.playerName);
      const roomObject = (!playerObject || !playerObject.room)
        ? undefined
        : action.payload.rooms.find(room => room.name === playerObject.room);
      let currentStep = 'roomNameSelection';

      if (roomObject !== undefined && roomObject.state === roomState.BUSY) currentStep = 'game';
      // eslint-disable-next-line prefer-destructuring
      if (state.currentStep === 'endGame' || state.currentStep === 'gameReport') currentStep = state.currentStep;

      return {
        ...state,
        currentPlayerType: (playerObject !== undefined ? playerObject.type : playerType.NONE),
        currentStep,
        message: action.msg[0],
        playerList: (roomObject !== undefined ? roomObject.players : action.payload.players),
        roomList: action.payload.rooms,
        roomName: (roomObject !== undefined ? roomObject.name : ''),
        roomObject,
      };
    }
    case STORE_ROOM:
      return {
        ...state,
        roomName: action.payload.roomName,
        roomGameMode: action.payload.roomGameMode,
      };
    case msgType.CLIENT.JOIN_ROOM:
      return { ...state, isLoading: true };
    case `${msgType.CLIENT.JOIN_ROOM}_SUCCESS`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        isLoading: false,
        isInRoom: true,
      };
    case `${msgType.CLIENT.JOIN_ROOM}_ERROR`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        isLoading: false,
        message: action.msg,
      };
    case msgType.CLIENT.LEAVE_ROOM:
      return { ...state, isLoading: true };
    case `${msgType.CLIENT.LEAVE_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: playerType.NONE,
        currentStep: 'roomNameSelection',
        isLoading: false,
        isInRoom: false,
      };
    case `${msgType.CLIENT.CONNECT_TO_ROOM}_SUCCESS`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        isInRoom: true,
      };
    case `${msgType.CLIENT.CONNECT_TO_ROOM}_ERROR`:
      return {
        ...state,
        currentStep: 'playerNameSelection',
        playerName: '',
        roomName: '',
        roomObject: undefined,
        message: action.msg,
      };
    case msgType.CLIENT.START_PARTY:
      return { ...state, currentStep: 'loading' };
    case msgType.SERVER.GAME_END:
      return { ...state, currentStep: 'endGame' };
    case msgType.SERVER.GAME_REPORT:
      return { ...state, currentStep: 'gameReport' };
    case `${msgType.CLIENT.RESET_ROOM}_SUCCESS`:
      return { ...state, currentStep: 'roomNameSelection' };
    default:
      return state;
  }
};

export default reducer;
