import * as dbg from '../../common/devLog';
import { roomState } from '../../common/enums';

export default class Room {
  constructor(name, slots) {
    this._name = name;
    this.state = roomState.FREE;
    this._players = []; // In order of arrival
    this.slots = slots;
  }

  get name() {
    return this._name;
  }

  freeSlots() {
    return this.slots - this._players.length;
  }

  get players() {
    return this._players;
  }

  addPlayer(player) {
    if (this.freeSlots() === 0) {
      return false;
    }
    this._players.push(player);
    return true;
  }

  removePlayer(player) {
    const toRm = this._players.findIndex(p => player.id === p.id);
    if (toRm !== -1) {
      this._players.splice(toRm, 1);
      if (this._players.length === 0) {
        player.deleteRoom(this._name);
      }
      return true;
    }
    return false;
  }

  get master() {
    if (this._players.length === 0) {
      return null;
    }
    return this._players[0];
  }

  isMaster(player) {
    if (this.master !== null && this.master.id === player.id) {
      return true;
    }
    return false;
  }

  start(player) {
    if (!this.isMaster(player)) {
      return 'Player is not master';
    }
    this.state = roomState.BUSY;
    return null;
  }
}
