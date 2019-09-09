import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG } from '../../common/enums';
import { lobby, timeline } from '../models/Env';

export function sendLobbyToClients() {
  if (timeline.length > 0) {
    const payload = lobby.serialize();
    const msg = timeline;
    Object.values(lobby.players).forEach(player => (
      comm.sendRequest(player.socket, eventType.LOBBY, msgType.SERVER.LOBBY_DATA, payload, msg)
    ));
    timeline.splice(0, -1);
  }
}

export function clientJoinRoom(sock, data) {
  // Check if player exists
  const player = lobby.getPlayer(sock.id);
  if (player === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  // Check if player is not in a room already
  if (player.room !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player already in a room');
    return false;
  }
  // Create the room first if it does not exist
  const { roomName } = data.payload;
  if (!lobby.hasRoom(roomName)) {
    const r = lobby.addRoom(roomName, CONFIG.SLOTS_PER_ROOM);
    if (r !== null) {
      comm.sendError(sock, eventType.LOBBY, data.type, r);
      return false;
    }
    timeline.push(`Room created: ${roomName}`);
  }
  const room = lobby.getRoom(roomName);
  // Join the room
  if (!player.joinRoom(room)) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Room is full');
    return false;
  }
  comm.sendResponse(sock, eventType.LOBBY, data.type,
    { playerName: player.name, roomName, playerType: player.type });
  return true;
}

export function clientConnectLobby(sock, data) {
  const { playerName } = data.payload;
  const r = lobby.addPlayer(sock, playerName);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
  } else {
    comm.sendResponse(sock, eventType.LOBBY, data.type, { playerName });
    timeline.push(`New player: ${playerName}`);
  }
}

export function clientConnectRoom(sock, data) {
  const { playerName, roomName } = data.payload;
  let r = lobby.addPlayer(sock, playerName);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
    return false;
  }
  timeline.push(`New player: ${playerName}`);
  const player = lobby.getPlayer(sock.id);
  if (!lobby.hasRoom(roomName)) {
    r = lobby.addRoom(roomName, CONFIG.SLOTS_PER_ROOM);
    if (r !== null) {
      comm.sendError(sock, eventType.LOBBY, data.type, r);
      return false;
    }
    timeline.push(`Room created: ${roomName}`);
  }
  const room = lobby.getRoom(roomName);
  if (!player.joinRoom(room)) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Room is full');
    return false;
  }
  timeline.push(`Player ${player.name} join room: ${roomName}`);
  comm.sendResponse(sock, eventType.LOBBY, data.type,
    { playerName, roomName, playerType: player.type });
  return true;
}

export function clientLeaveRoom(sock, data) {
  const { roomName } = data;
  // Check if player exists
  const player = lobby.getPlayer(sock.id);
  if (player === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  // Check if player is in this room
  if (player.room === null || player.room.name !== roomName) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not in this room');
    return false;
  }
  // Leave the room
  player.leaveRoom();
  timeline.push(`Player ${player.name} left room: ${roomName}`);
  comm.sendResponse(sock, eventType.LOBBY, data.type, {});
  return true;
}

export function clientDisconnect(sock) {
  const player = lobby.getPlayer(sock.id);
  if (player !== null) {
    timeline.push(`Player left: ${player.name}`);
    lobby.deletePlayer(player.id);
  }
}
