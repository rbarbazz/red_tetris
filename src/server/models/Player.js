import * as dbg from '../../common/devLog';
import { playerType } from '../../common/enums';

export default class Player {
  constructor(lobby, name, sock) {
    this._lobby = lobby; // Back link to lobby
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
    if (!room.addPlayer(this)) {
      return false;
    }
    if (room.master !== null) {
      if (this.id === room.master.id) {
        this.type = playerType.MASTER;
      } else {
        this.type = playerType.SLAVE;
      }
    }
    this._room = room;
    return true;
  }

  leaveRoom() {
    this._room.removePlayer(this);
    this._room = null;
    this.type = playerType.NONE;
  }

  deleteRoom(room) {
    this._lobby.deleteRoom(room);
  }
}
