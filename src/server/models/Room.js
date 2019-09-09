import * as dbg from '../../common/devLog';
import { roomState, playerType } from '../../common/enums';

export default class Room {
  constructor(lobby, name, slots) {
    this._lobby = lobby; // Back link to lobby
    this._name = name;
    this.state = roomState.FREE;
    this._players = []; // In order of arrival
    this._spectators = []; // Order does not matter
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
    if (this.state === roomState.FREE && this.freeSlots() === 0) {
      return false;
    }
    if (this.state === roomState.BUSY) {
      this._spectators.push(player);
    } else {
      this._players.push(player);
    }
    return true;
  }

  removePlayer(player) {
    const toRm = this._players.findIndex(p => player.id === p.id);
    if (toRm !== -1) {
      this._players.splice(toRm, 1);
      if (this._players.length === 0) {
        this._lobby.deleteRoom(this._name);
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

  isSpectator(player) {
    return this._spectators.findIndex(p => player.id === p.id) !== -1;
  }

  getPlayerType(player) {
    if (this.isMaster(player)) {
      return playerType.MASTER;
    }
    if (this.isSpectator(player)) {
      return playerType.SPECTATOR;
    }
    return playerType.SLAVE;
  }

  start(player) {
    if (!this.isMaster(player)) {
      return 'Player is not master';
    }
    this.state = roomState.BUSY;
    return null;
  }

  serialize() {
    return {
      name: this.name,
      state: this.state,
      slots: [this.freeSlots(), this._players.length, this.slots],
      master: this.master.name,
      players: Object.values(this._players).map(v => v.serialize()),
      spectators: Object.values(this._spectators).map(v => v.serialize()),
    };
  }
}
