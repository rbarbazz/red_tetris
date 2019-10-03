import { eventType, msgType, KEYS } from '../../common/enums';


const keyIds = {
  32: KEYS.SPACE,
  39: KEYS.RIGHT,
  37: KEYS.LEFT,
  38: KEYS.UP,
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

export const selectPlayerToSpectate = playerName => ({
  type: msgType.CLIENT.GAME_INPUT,
  payload: {
    key: KEYS.CLICK,
    name: playerName,
  },
});

export default sendGameInput;
