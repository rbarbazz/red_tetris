import * as dbg from '../../common/devLog';
import { eventType, msgType, CONFIG } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

export function gameStart(room) {
  const { game } = room;
  Object.values(room.players).forEach(player => (
    comm.sendRequest(player.socket, eventType.GAME, msgType.SERVER.GAME_START,
      { timer: CONFIG.START_DELAY, mode: game.type, nextPiece: game._bag.piece(0) })
  ));
  setTimeout(() => game.start(), CONFIG.START_DELAY);
}

export const a = true;
