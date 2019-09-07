import { CONFIG, roomState, playerType } from '../../common/enums';

export class Room {
  constructor(name, slots) {
    this._name = name;
    this.state = roomState.FREE;
    this._players = []; // In order of arrival
    this.slots = slots;
  }

  freeSlots() {
    return this._slots - this.players.length;
  }

  get players() {
    return this._players;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(player) {
    const toRm = this._players.findIndex(p => player.id() === p.id());
    if (toRm !== -1) {
      this._players.splice(toRm, 1);
      if (this._players.length === 0) {
        player.deleteRoom(this);
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
}

export function checkRoomName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}
