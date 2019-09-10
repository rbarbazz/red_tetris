import { DISPLAY_LOBBY } from '../actions/tetris';
import { STORE_PLAYER_NAME, STORE_ROOM } from '../actions/lobby';
import { msgType, playerType, roomState } from '../../common/enums';


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
        isLoading: false,
        message: '',
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
      return {
        ...state,
        currentPlayerType: (playerObject !== undefined ? playerObject.type : playerType.NONE),
        currentStep: (roomObject !== undefined && roomObject.state === roomState.BUSY)
          ? 'game'
          : 'roomNameSelection',
        message: action.msg[0],
        playerList: (roomObject !== undefined ? roomObject.players : action.payload.players),
        roomList: action.payload.rooms,
        roomName: (roomObject !== undefined ? roomObject.name : ''),
        roomObject,
      };
    }
    case STORE_ROOM:
      return { ...state, roomName: action.payload.roomName };
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
      };
    default:
      return state;
  }
};

export default reducer;
