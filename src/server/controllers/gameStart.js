import * as dbg from '../../common/devLog';
import { eventType, msgType, playerType } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

export function gameStart(room) {
  const { game } = room;
  Object.values(room.players).forEach(player => (
    comm.sendRequest(player.socket, eventType.GAME, msgType.SERVER.GAME_START,
      { timer: 3000 })
  ));
  /*
      setTimeout(() => game.start(), 3100);
  */
  game.start();
}

export const a = true;
