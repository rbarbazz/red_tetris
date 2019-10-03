import * as dbg from '../../common/devLog';
import * as comm from '../../common/sockWrapper';
import { eventType, msgType, CONFIG } from '../../common/enums';
import { timeline } from '../models/Timeline';
import lobby from '../models/Lobby';

export function sendLobbyToClients() {
  if (timeline.hasMessage() > 0) {
    const payload = lobby.serialize();
    const msg = timeline.messages;
    Object.values(lobby.players).forEach(player => (
      comm.sendRequest(player.socket, eventType.LOBBY, msgType.SERVER.LOBBY_DATA, payload, msg)
    ));
    timeline.clear();
  }
}

export function clientResetRoom(sock, data) {
  const player = lobby.getPlayer(sock.id);
  if (player === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  const { room } = player;
  if (room === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not in a room');
    return false;
  }
  room.stop();
  comm.sendRequest(sock, eventType.LOBBY, `${msgType.CLIENT.RESET_ROOM}_SUCCESS`, {});
  return true;
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
  const { roomName, roomGameMode } = data.payload;
  if (!lobby.hasRoom(roomName)) {
    const r = lobby.addRoom(roomName, CONFIG.SLOTS_PER_ROOM, roomGameMode);
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
  timeline.push(`Player ${player.name} join room: ${room.name}`);
  comm.sendResponse(sock, eventType.LOBBY, data.type);
  return true;
}

export function clientConnectLobby(sock, data) {
  const { playerName } = data.payload;
  const r = lobby.addPlayer(sock, playerName);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
  } else {
    comm.sendResponse(sock, eventType.LOBBY, data.type);
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
  const player = lobby.getPlayer(sock.id);
  if (!lobby.hasRoom(roomName)) {
    r = lobby.addRoom(roomName, CONFIG.SLOTS_PER_ROOM);
    if (r !== null) {
      lobby.deletePlayer(player.id);
      comm.sendError(sock, eventType.LOBBY, data.type, r);
      return false;
    }
  }
  const room = lobby.getRoom(roomName);
  if (!player.joinRoom(room)) {
    lobby.deletePlayer(player.id);
    comm.sendError(sock, eventType.LOBBY, data.type, 'Room is full');
    return false;
  }
  timeline.push(`New player ${player.name} join new room: ${roomName}`);
  comm.sendResponse(sock, eventType.LOBBY, data.type);
  return true;
}

export function clientLeaveRoom(sock, data) {
  // Check if player exists
  const player = lobby.getPlayer(sock.id);
  if (player === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  // Check if player is in this room
  if (player.room === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not in a room');
    return false;
  }
  const roomName = player.room.name;
  // Leave the room
  player.leaveRoom();
  timeline.push(`Player ${player.name} left room: ${roomName}`);
  comm.sendResponse(sock, eventType.LOBBY, data.type);
  return true;
}

export function clientDisconnect(sock) {
  const player = lobby.getPlayer(sock.id);
  if (player !== null) {
    timeline.push(`Player left: ${player.name}`);
    lobby.deletePlayer(player.id);
  }
}

export function clientStartParty(sock, data) {
  // Check if player exists
  const player = lobby.getPlayer(sock.id);
  if (player === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  const { room } = player;
  // Check if player is in this room
  if (room === null) {
    comm.sendError(sock, eventType.LOBBY, data.type, 'Player not in a room');
    return false;
  }
  const r = room.start(player);
  if (r !== null) {
    comm.sendError(sock, eventType.LOBBY, data.type, r);
    return false;
  }
  timeline.push(`Party in room '${room.name}' has started`);
  comm.sendResponse(sock, eventType.LOBBY, data.type);
  return { player, room };
}
