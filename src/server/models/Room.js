import { CONFIG, roomState } from '../../common/enums';

export class Room {
  constructor(name, maxSlot) {
    this.name = name;
    this.slots = maxSlot;
    this.state = roomState.FREE;
    this.players = [];
    this.master = null;
  }

  freeSlots() {
    return this.slots - Object.keys(this.players).length;
  }

  maxSlots() {
    return this.slots;
  }
}

export function checkRoomName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}
