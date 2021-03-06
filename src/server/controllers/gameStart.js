import { eventType, msgType, CONFIG } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

export function gameStart(data) {
  const { player, room } = data;
  const { game } = room;
  Object.values(room.players).forEach((p) => {
    comm.sendRequest(p.socket, eventType.GAME, msgType.SERVER.GAME_START,
      { timer: CONFIG.START_DELAY, mode: game.type });
    game.send(player, true, true);
  });
  game.start();
}

export const a = true;
