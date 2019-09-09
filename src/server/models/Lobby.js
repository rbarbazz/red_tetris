import * as dbg from '../../common/devLog';
import { CONFIG } from '../../common/enums';
import Room from './Room';
import Player from './Player';

function checkName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}

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
      return 'Nickname alredy taken';
    }
    this._players[sock.id] = new Player(this, name, sock);
    return null;
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

  addRoom(name, slots) {
    if (!checkName(name)) {
      return 'Invalid room name';
    }
    if (this.hasRoom(name)) {
      return 'Room already exist';
    }
    if (this.freeSlots() === 0) {
      return 'No slot available for a new room';
    }
    this._rooms[name] = new Room(name, slots);
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
      players: Object.values(room.players).map(player => (
        { playerName: player.name, playerType: player.type }
      )),
    }));
    return data;
  }
}
