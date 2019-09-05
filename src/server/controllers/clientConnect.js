import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, CONFIG } from '../../common/enums';
import appData from '../models/Env';
import { checkPlayerName } from '../models/Player';

/*
  Check if a new player can connect.
  Check his name, free slot in the server...
*/
function checkNewClient(name, lobbyName = null) {
  if (Object.keys(appData.players).length === CONFIG.MAX_SLOT) {
    return 'Server is full, no slot available';
  }
  if (!checkPlayerName(name)) {
    return 'Nickname invalid';
  }
  if (name in appData.players) {
    return 'Player already conencted';
  }
  if (Object.values(appData.players).findIndex(player => player.name === name) !== -1) {
    return 'Nickname alredy taken';
  }
  return null;
}

export function clientConnectLobby(sock, data) {
  const { playerName } = data.payload;
  const r = checkNewClient(playerName);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
    return false;
  }
  appData.addPlayer(sock, playerName);
  comm.sendResponse(sock, eventType.LOBBY, data.type, { playerName });
  return `New player: ${playerName}`;
}

export function clientConnectParty(sock, payload) {
}

export function clientDisconnect(sock) {
  if (sock.id in appData.players) {
    const msg = `Player left: ${appData.players[sock.id].name}`;
    delete appData.players[sock.id];
    return msg;
  }
  return false;
}
