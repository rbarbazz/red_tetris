import * as dbg from '../../common/devLog';
import { roomState, playerType } from '../../common/enums';
import Game from './Game';

export default class Room {
  constructor(lobby, name, slots) {
    this._lobby = lobby; // Back link to lobby
    this._name = name;
    this.state = roomState.FREE;
    this._players = []; // In order of arrival
    this._spectators = []; // Order does not matter
    this.slots = slots;
    this._game = null;
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

  get spectators() {
    return this._spectators;
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
    if (player.type === playerType.SPECTATOR) {
      const toRm = this._spectators.findIndex(p => player.id === p.id);
      if (toRm === -1) {
        return false;
      }
      this._spectators.splice(toRm, 1);
    } else {
      const toRm = this._players.findIndex(p => player.id === p.id);
      if (toRm === -1) {
        return false;
      }
      this._players.splice(toRm, 1);
      // Solo, player left so just delete the party and the room
      if (this._players.length === 0) {
        if (this.state === roomState.BUSY) {
          this.stop();
        }
        this._lobby.deleteRoom(this._name);
      }
      // Multi, end the party if only 1 player left
      if (this._players.length === 1) {
        if (this.state === roomState.BUSY) {
          this.stop();
        }
      }
    }
    return true;
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

  get game() {
    return this._game;
  }

  // Create a new game instance
  start(player) {
    if (!this.isMaster(player)) {
      return 'Player is not master';
    }
    this.state = roomState.BUSY;
    this._game = new Game(this.players);
    return null;
  }

  stop() {
    this._game.stop();
    this.state = roomState.FREE;
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
