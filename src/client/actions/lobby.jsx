import { eventType, msgType } from '../../common/enums';

export const STORE_PLAYER_NAME = 'STORE_PLAYER_NAME';
export const STORE_ROOM = 'STORE_ROOM';

export const handlePlayerNameSelection = playerName => ({
  type: STORE_PLAYER_NAME,
  payload: { playerName },
});

export const submitPlayerName = playerName => ({
  eventType: eventType.LOBBY,
  type: msgType.CLIENT.CONNECT_TO_LOBBY,
  payload: { playerName },
});

export const handleroomNameSelection = roomName => ({
  type: STORE_ROOM,
  payload: { roomName },
});

export const submitRoomName = roomName => ({
  eventType: eventType.LOBBY,
  type: msgType.CLIENT.JOIN_PARTY,
  payload: { roomName },
});
