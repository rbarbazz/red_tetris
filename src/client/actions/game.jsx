import { eventType, msgType } from '../../common/enums';

// Send input move to the server
export const sendGameInput = (key, event) => ({
  type: msgType.CLIENT.GAME_INPUT,
  payload: { key, event },
  eventType: eventType.GAME,
});

export default sendGameInput;
