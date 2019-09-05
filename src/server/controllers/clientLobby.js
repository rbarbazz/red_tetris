import { eventType, msgType, playerType, CONFIG } from '../../common/enums';
import appData from '../models/Env';
import * as comm from '../../common/sockWrapper';
import checkRoomName from '../models/Room';

export function clientSendLobby() {
  const payload = {};
  payload.players = Object.values(appData.players).map(v => v.name);
  payload.rooms = Object.values(appData.rooms).map(room => ({
    name: room.name,
    slots: [room.freeSlots(), room.slots],
    state: room.state,
    players: Object.keys(room.players).map(player => appData.players[player].name),
  }));
  Object.values(appData.players).forEach(player => (
    comm.sendRequest(player.sock, msgType.SERVER.LOBBY_DATA, payload)
  ));
}

export function clientJoinParty(socket, data) {
  if (!appData.hasPlayer(socket.id)) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  const player = appData.players[socket.id];
  if (player.room !== null) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Player already in a room');
    return false;
  }
  if (!checkRoomName(data.roomName)) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Invalid room name');
    return false;
  }
  if (!appData.hasRoom(data.roomName)) {
    if (!appData.addRoom(data.roomName, CONFIG.SLOTS_PER_ROOM)) {
      comm.sendError(socket, eventType.LOBBY, data.type, 'Maximum room reached');
      return false;
    }
  }
  const room = appData.rooms[data.roomName];
  if (room.freeSlots() == 0) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Room is full');
      return false;
  }
  if (room.players.length === 0) {
    room.master = player.id;
    player.type = playerType.MASTER;
  }
  player.room = room.name;
  room.players.push(player.id);
  return true;
}
