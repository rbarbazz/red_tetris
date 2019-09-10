import * as dbg from '../../common/devLog';
import { eventType, msgType, playerType } from '../../common/enums';
import * as comm from '../../common/sockWrapper';

export function gameStart(room) {
  const game = room.game;
  Object.values(room.players).forEach(player => (
    comm.sendRequest(player.socket, eventType.GAME, msgType.SERVER.GAME_START,
      { })
  ));
  game.start();
}

export const a = true;
