import { eventType, msgType } from '../../common/enums';

export const DISPLAY_LOBBY = 'DISPLAY_LOBBY';

export const displayLobby = () => ({
  type: DISPLAY_LOBBY,
});

export const submitHashBasedData = (playerName, roomName) => ({
  type: msgType.CLIENT.CONNECT_TO_ROOM,
  payload: {
    playerName,
    roomName,
  },
  eventType: eventType.LOBBY,
});
