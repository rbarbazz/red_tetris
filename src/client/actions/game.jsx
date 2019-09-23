import { eventType, msgType, KEYS } from '../../common/enums';


const keyIds = {
  32: KEYS.SPACE,
  37: KEYS.RIGHT,
  38: KEYS.LEFT,
  39: KEYS.UP,
  40: KEYS.DOWN,
};

// Send input move to the server
export const sendGameInput = (key, event) => ({
  type: msgType.CLIENT.GAME_INPUT,
  payload: {
    key: keyIds[key],
    event,
  },
  eventType: eventType.GAME,
});

export default sendGameInput;
