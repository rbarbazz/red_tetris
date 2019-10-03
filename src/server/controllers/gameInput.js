/* eslint-disable import/prefer-default-export */
import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { playerType, eventType, msgType, CONFIG } from '../../common/enums';
import timeline from '../models/Timeline';
import lobby from '../models/Lobby';

export function gameInput(socket, data) {
  // TODO: Add checks
  const player = lobby.getPlayer(socket.id);
  if (player === null) return false;
  const { game } = player.room;
  if (game === null) return false;
  if (game.running === false) return false;
  const r = game.playerAction(player, data.payload);
  if (player.type !== playerType.SPECTATOR) {
    if (r === true) {
      game.send(game._instances[player.id]);
    }
  }
  return true;
}
