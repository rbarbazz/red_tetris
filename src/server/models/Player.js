import * as dbg from '../../common/devLog';
import { playerType } from '../../common/enums';

export default class Player {
  constructor(name, sock) {
    this._name = name;
    this._sock = sock;
    this._room = null;
  }

  get type() {
    if (this._room === null) {
      return playerType.NONE;
    }
    return this._room.getPlayerType(this);
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

  serialize() {
    return {
      name: this.name,
      type: this.type,
      room: (this.room === null) ? null : this.room.name,
    };
  }
}
