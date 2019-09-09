import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType, playerType } from '../../common/enums';

const initialState = {
  currentRoomList: [],
  currentRoomPlayerList: [],
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
        playerName: action.payload.playerName,
        errorMessage: '',
      };
    case `${msgType.CLIENT.CONNECT_TO_LOBBY}_ERROR`:
      return {
        ...state,
        currentStep: 'playerNameSelection',
        errorMessage: action.msg,
      };
    case msgType.SERVER.LOBBY_DATA: {
      const joinedRoom = action.payload.rooms.find(element => element.name === state.roomName);
      return {
        ...state,
        currentRoomList: action.payload.rooms,
        currentRoomPlayerList: (joinedRoom !== undefined ? joinedRoom.players : action.payload.players),
        roomObject: joinedRoom,
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
        roomName: action.payload.roomName,
        currentPlayerType: action.payload.playerType,
      };
    case `${msgType.CLIENT.JOIN_ROOM}_ERROR`:
      return {
        ...state,
        currentStep: 'roomNameSelection',
        errorMessage: action.msg,
        roomName: action.payload.roomName,
      };
    case msgType.CLIENT.LEAVE_ROOM:
      return { ...state, currentStep: 'loading' };
    case `${msgType.CLIENT.LEAVE_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: playerType.NONE,
        currentStep: 'roomNameSelection',
        isInRoom: false,
        roomName: '',
      };
    case `${msgType.CLIENT.CONNECT_TO_ROOM}_SUCCESS`:
      return {
        ...state,
        currentPlayerType: action.payload.playerType,
        currentStep: 'roomNameSelection',
        isInRoom: true,
        playerName: action.payload.playerName,
        roomName: action.payload.roomName,
      };
    default:
      return state;
  }
};

export default reducer;
