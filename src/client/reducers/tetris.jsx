import { DISPLAY_LOBBY } from '../actions/tetris';
import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType, playerType, roomState } from '../../common/enums';

const initialState = {
  currentPlayerType: playerType.NONE,
  currentStep: 'loading',
  errorMessage: '',
  isInRoom: false,
  playerList: [],
  playerName: '',
  roomList: [],
  roomName: '',
  roomObject: undefined,
  score: 0,
  spectrums: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOBBY:
      return { ...state, currentStep: 'playerNameSelection' };
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
        errorMessage: '',
      };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`:
      return {
        ...state,
        currentStep: 'playerNameSelection',
        errorMessage: action.msg,
      };
    case msgType.SERVER.LOBBY_DATA: {
      const playerObject = action.payload.players.find(player => player.name === state.playerName);
      const roomObject = (!playerObject || !playerObject.room)
        ? undefined
        : action.payload.rooms.find(room => room.name === playerObject.room);
      return {
        ...state,
        currentPlayerType: (playerObject !== undefined ? playerObject.type : playerType.NONE),
        currentStep: (roomObject !== undefined && roomObject.state === roomState.BUSY)
          ? 'game'
          : 'roomNameSelection',
        playerList: (roomObject !== undefined ? roomObject.players : action.payload.players),
        roomList: action.payload.rooms,
        roomName: (roomObject !== undefined ? roomObject.name : ''),
        roomObject,
      };
    }
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
    case msgType.CLIENT.JOIN_ROOM:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.JOIN_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: action.payload.playerType,
        currentStep: 'roomNameSelection',
        isInRoom: true,
      };
    case `${msgType.CLIENT.JOIN_ROOM}_ERROR`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        errorMessage: action.msg,
      };
    case msgType.CLIENT.LEAVE_ROOM:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.LEAVE_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: playerType.NONE,
        currentStep: 'roomNameSelection',
        isInRoom: false,
      };
    case `${msgType.CLIENT.CONNECT_TO_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: action.payload.playerType,
        currentStep: 'roomNameSelection',
        isInRoom: true,
      };
    default:
      return state;
  }
};

export default reducer;
