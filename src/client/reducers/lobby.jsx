import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType, playerType } from '../../common/enums';

const initialState = {
  roomList: [],
  playerList: [],
  currentStep: 'playerNameSelection',
  isInRoom: false,
  playerName: '',
  currentPlayerType: playerType.NONE,
  roomName: '',
  roomObject: undefined,
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
        roomList: action.payload.rooms,
        playerList: (roomObject !== undefined ? roomObject.players : action.payload.players),
        roomObject,
        roomName: (roomObject !== undefined ? roomObject.name : ''),
        currentPlayerType: (playerObject !== undefined ? playerObject.type : playerType.NONE),
      };
    }
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
    case msgType.CLIENT.JOIN_ROOM:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.JOIN_ROOM}_SUCCESS`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        isInRoom: true,
        currentPlayerType: action.payload.playerType,
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
