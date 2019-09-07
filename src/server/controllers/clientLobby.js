import { eventType, msgType, playerType, CONFIG } from '../../common/enums';
import { lobby } from '../models/Env';
import * as comm from '../../common/sockWrapper';
import { checkRoomName } from '../models/Room';

export function clientSendLobby(msg) {
  const payload = lobby.serialize();
  Object.values(lobby.players).forEach(player => (
    comm.sendRequest(player.socket, eventType.LOBBY, msgType.SERVER.LOBBY_DATA, payload, msg)
  ));
}

function createRoom(player, roomName) {
  if (!checkRoomName(roomName)) {
    return 'Invalid room name';
  }
  if (lobby.hasRoom(roomName)) {
    return 'Room already exist';
  }
  if (!lobby.addRoom(roomName, CONFIG.SLOTS_PER_ROOM)) {
    return 'Room limit has been reached';
  }
  return null;
}

export function clientJoinRoom(socket, data) {
  // Check if player exists
  const player = lobby.getPlayer(socket.id);
  if (player === null) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Player not connected');
    return false;
  }
  // Check if player is not in a room already
  if (player.room !== null) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Player already in a room');
    return false;
  }
  // Create the room first if it does not exist
  const { roomName } = data.payload;
  if (!lobby.hasRoom(roomName)) {
    const r = createRoom(player, roomName);
    if (r !== null) {
      // comm.sendError(socket, eventType.LOBBY, data.type, r);
      return false;
    }
  }
  const room = lobby.getRoom(roomName);
  // Check if their is a free slot in the room
  if (!player.joinRoom(room)) {
    comm.sendError(socket, eventType.LOBBY, data.type, 'Room is full');
    return false;
  }
  // Join the room
  player.joinRoom(room);
  comm.sendResponse(player.sock, eventType.LOBBY, data.type, { roomName: room.name });
  return true;
}

