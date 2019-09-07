import * as dbg from '../../common/devLog';
import { playerType } from '../../common/enums';

export default class Player {
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
    if (!room.addPlayer(this)) {
      return false;
    }
    this._room = room;
    return true;
  }

  leaveRoom() {
    this._room.removePlayer(this);
    this._room = null;
  }

  deleteRoom(room) {
    this._lobby.deleteRoom(room);
  }
}
