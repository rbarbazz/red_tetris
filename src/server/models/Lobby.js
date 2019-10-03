import { CONFIG, GAME_TYPE } from '../../common/enums';
import Room from './Room';
import Player from './Player';
import { timeline } from './Timeline';

export function checkName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}

export class Lobby {
  constructor(slots) {
    this._slots = slots;
    this._players = {}; // key = sock.id, value = Player()
    this._rooms = {}; // key = room name, value = Room()
  }

  get slots() {
    return this._slots;
  }

  freeSlots() {
    return this._slots - Object.keys(this._players).length;
  }

  get players() {
    return this._players;
  }

  get rooms() {
    return this._rooms;
  }

  addPlayer(sock, name) {
    if (this.freeSlots() === 0) {
      return 'Server is full, no slot available';
    }
    if (!checkName(name)) {
      return 'Invalid nickname';
    }
    if (this.hasPlayerId(sock.id)) {
      return 'Player already connected';
    }
    if (this.hasPlayerName(name)) {
      return 'Nickname already taken';
    }
    this._players[sock.id] = new Player(name, sock);
    return null;
  }

  hasPlayerId(id) {
    return id in this._players;
  }

  hasPlayerName(name) {
    return Object.values(this._players)
      .findIndex(player => player.name === name) !== -1;
  }

  getPlayer(id) {
    if (!this.hasPlayerId(id)) {
      return null;
    }
    return this._players[id];
  }

  deletePlayer(id) {
    const player = this._players[id];
    if (player === null) {
      return false;
    }
    if (player.room !== null) {
      player.leaveRoom();
    }
    delete this._players[id];
    return true;
  }

  addRoom(name, slots, mode = GAME_TYPE.CLASSIC) {
    if (!checkName(name)) {
      return 'Invalid room name';
    }
    if (this.hasRoom(name)) {
      return 'Room already exist';
    }
    if (this.freeSlots() === 0) {
      return 'No slot available for a new room';
    }
    this._rooms[name] = new Room(this, name, slots, mode);
    return null;
  }

  hasRoom(id) {
    return id in this.rooms;
  }

  getRoom(id) {
    if (!this.hasRoom(id)) {
      return null;
    }
    return this._rooms[id];
  }

  deleteRoom(id) {
    if (!this.hasRoom(id)) {
      return false;
    }
    timeline.push(`Room has been destroyed: ${this._rooms[id].name}`);
    this._rooms[id].stop();
    delete this._rooms[id];
    return true;
  }

  serialize() {
    return {
      slots: this.slots,
      players: Object.values(this._players).map(v => v.serialize()),
      rooms: Object.values(this._rooms).map(v => v.serialize()),
    };
  }
}

const lobby = new Lobby(CONFIG.MAX_SLOT);
export default lobby;
