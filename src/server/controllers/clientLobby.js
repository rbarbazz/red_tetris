import { eventType, msgType, playerType, CONFIG } from '../../common/enums';
import appData from '../models/Env';
import * as comm from '../../common/sockWrapper';
import { checkRoomName } from '../models/Room';

export function clientSendLobby(msg) {
  const payload = {};
  payload.players = Object.values(appData.players).map(v => v.name);
  payload.rooms = Object.values(appData.rooms).map(room => ({
    name: room.name,
    slots: [room.freeSlots(), room.slots],
    state: room.state,
    players: Object.values(room.players).map(player => appData.players[player].name),
  }));
  Object.values(appData.players).forEach(player => (
    comm.sendRequest(player.sock, eventType.LOBBY, msgType.SERVER.LOBBY_DATA, payload, msg)
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
  const { roomName } = data.payload;
  if (!appData.hasRoom(roomName)) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Room does not exist');
    return false;
  }
  const room = appData.rooms[roomName];
  if (room.freeSlots() === 0) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Room is full');
    return false;
  }
  if (room.players.length === 0) {
    room.master = player.id();
    player.type = playerType.MASTER;
  }
  player.room = room.name;
  room.players.push(player.id());
  comm.sendResponse(player.sock, eventType.LOBBY, data.type, { roomName: room.name });
  return true;
}

export function clientCreateRoom(socket, data) {
  const { roomName } = data.payload;
  let error = null;
  if (!checkRoomName(roomName)) {
    error = 'Invalid room name';
  } else if (appData.hasRoom(roomName)) {
    error = 'Room already exist';
  } else if (!appData.addRoom(roomName, CONFIG.SLOTS_PER_ROOM)) {
    error = 'Room limit has been reached';
  }
  if (error !== null) {
    comm.sendError(socket, eventType.LOBBY, data.type, error);
    return false;
  }
  comm.sendResponse(socket, eventType.LOBBY, data.type, { roomName });
  return `New room has been created: ${roomName}`;
}
