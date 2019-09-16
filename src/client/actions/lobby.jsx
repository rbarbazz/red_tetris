import { eventType, msgType } from '../../common/enums';

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

export const handleroomNameSelection = roomName => ({
  type: STORE_ROOM,
  payload: { roomName },
});

export const submitRoomName = roomName => ({
  type: msgType.CLIENT.JOIN_ROOM,
  payload: { roomName },
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
