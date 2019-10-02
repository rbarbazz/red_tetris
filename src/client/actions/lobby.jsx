import { eventType, GAME_TYPE, msgType } from '../../common/enums';

export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const STORE_ROOM = 'STORE_ROOM';

export const handlePlayerNameSelection = playerName => ({
  type: STORE_PLAYER_NAME,
  payload: { playerName },
});

export const submitPlayerName = playerName => ({
  type: msgType.CLIENT.CONNECT_TO_LOBBY,
  payload: { playerName },
  eventType: eventType.LOBBY,
});

export const handleRoomSelection = (roomName, roomGameMode = GAME_TYPE.CLASSIC) => ({
  type: STORE_ROOM,
  payload: { roomName, roomGameMode },
});

export const submitRoom = (roomName, roomGameMode) => ({
  type: msgType.CLIENT.JOIN_ROOM,
  payload: { roomName, roomGameMode },
  eventType: eventType.LOBBY,
});

export const leaveRoom = () => ({
  type: msgType.CLIENT.LEAVE_ROOM,
  eventType: eventType.LOBBY,
});

export const ownerIsReady = () => ({
  type: msgType.CLIENT.START_PARTY,
  eventType: eventType.LOBBY,
});

export const resetRoom = () => ({
  type: msgType.CLIENT.RESET_ROOM,
  eventType: eventType.LOBBY,
});
