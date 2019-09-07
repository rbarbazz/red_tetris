import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, CONFIG } from '../../common/enums';
import { lobby, game } from '../models/Env';
import { checkPlayerName } from '../models/Player';

/*
  Check if a new player can connect.
  Check his name, free slot in the server...
*/
function checkNewClient(sock, name, lobbyName = null) {
  if (lobby.freeSlots() === 0) {
    return 'Server is full, no slot available';
  }
  if (!checkPlayerName(name)) {
    return 'Invalid nickname';
  }
  if (lobby.hasPlayerId(sock.id)) {
    return 'Player already connected';
  }
  if (lobby.hasPlayerName(name)) {
    return 'Nickname alredy taken';
  }
  return null;
}

export function clientConnectLobby(sock, data) {
  const { playerName } = data.payload;
  const r = checkNewClient(sock, playerName);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
    return false;
  }
  lobby.addPlayer(playerName, sock);
  comm.sendResponse(sock, eventType.LOBBY, data.type, { playerName });
  return `New player: ${playerName}`;
}

export function clientConnectParty(sock, payload) {
}

export function clientDisconnect(sock) {
  const player = lobby.getPlayer(sock.id);
  if (player !== null) {
    const msg = `Player left: ${player.name}`;
    lobby.deletePlayer(player.id);
    return msg;
  }
  return false;
}
