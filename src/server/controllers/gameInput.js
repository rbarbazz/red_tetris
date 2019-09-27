/* eslint-disable import/prefer-default-export */
import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG } from '../../common/enums';
import timeline from '../models/Timeline';
import lobby from '../models/Lobby';

export function gameInput(socket, data) {
  // TODO: Add checks
  const player = lobby.getPlayer(socket.id);
  const { game } = player.room;
  const r = game.playerAction(player, data.payload);
  if (r === true) {
    game.tick(player);
  }
}
