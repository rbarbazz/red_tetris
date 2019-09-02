import { eventType, msgType } from '../../common/enums';

// Send input move to the server
export const moveTetrimino = (key, event) => ({
  type: msgType.CLIENT.MOVE_TETRIMINO,
  payload: { key, event },
  eventType: eventType.GAME,
});

export default moveTetrimino;
