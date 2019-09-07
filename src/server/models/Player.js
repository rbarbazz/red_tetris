import { CONFIG, playerType } from '../../common/enums';

export class Player {
  constructor(lobby, name, sock) {
    this._lobby = lobby; // Back ling to lobby
    this._name = name;
    this._sock = sock;
    this.type = playerType.NONE;
    this._room = null;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._sock.id;
  }

  get socket() {
    return this._sock;
  }

  get room() {
    return this._room;
  }

  joinRoom(room) {
    if (room.freeSlots() === 0) {
      return false;
    }
    this._room = room;
    room.addPlayer(this);
    return true;
  }

  leaveRoom() {
    this._room = null;
    this.room.removePlayer(this);
  }

  deleteRoom(room) {
    this._lobby.deleteRoom(room);
  }
}

export function checkPlayerName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}
