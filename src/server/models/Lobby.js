import { Room } from './Room';
import { Player } from './Player';

export default class Lobby {
  constructor(slots) {
    this._slots = slots;
    this._players = {}; // key = sock.id, value = Player()
    this._rooms = {}; // key = room name, value = Room()
  }

  get slots() {
    return this._slots;
  }

  get players() {
    return this._players;
  }

  get rooms() {
    return this._rooms;
  }

  freeSlots() {
    return this._slots - Object.keys(this._players).length;
  }

  addPlayer(name, sock) {
    this._players[sock.id] = new Player(this, name, sock);
    return true;
  }

  hasPlayerId(id) {
    return id in this._players;
  }

  hasPlayerName(name) {
    return Object.values(this._players).findIndex(player => player.name === name) !== -1;
  }

  getPlayer(id) {
    if (!this.hasPlayerId(id)) {
      return null;
    }
    return this._players[id];
  }

  deletePlayer(id) {
    if (!this.hasPlayer(id)) {
      return false;
    }
    delete this._players[id];
    return true;
  }

  addRoom(name, slots) {
    if (this.freeSlots() === 0) {
      return false;
    }
    this._rooms[name] = new Room(name, slots);
    return true;
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
    delete this._rooms[id];
    return true;
  }

  serialize() {
    const data = {};
    data.players = Object.values(this._players).map(v => v.name);
    data.rooms = Object.values(this._rooms).map(room => ({
      name: room.name,
      slots: [room.freeSlots(), room.slots],
      state: room.state,
      players: Object.values(room.players).map(player => player.name),
    }));
    return data;
  }
}
