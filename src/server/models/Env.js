import { CONFIG } from '../../common/enums';
import Room from './Room';
import { Player } from './Player';

class Env {
  constructor() {
    this.players = {};
    this.rooms = {};
  }

  addPlayer(sock, name) {
    this.players[sock.id] = new Player(name, sock);
  }

  hasPlayer(id) {
    return id in this.players;
  }

  addRoom(name, slots) {
    this.rooms[name] = new Room(name, slots);
  }

  hasRoom(id) {
    return id in this.rooms;
  }
}

const appData = new Env();

export default appData;
