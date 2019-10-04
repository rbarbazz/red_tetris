import { roomState, playerType, GAME_SPEED } from '../../common/enums';
import Game from './Game';

export default class Room {
  constructor(lobby, name, slots, mode) {
    this._mode = mode;
    this._lobby = lobby; // Back link to lobby
    this._name = name;
    this.state = roomState.FREE;
    this._players = []; // In order of arrival
    this.slots = slots;
    this._game = null;
  }

  get mode() {
    return this._mode;
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
      return this._game.addSpectator(this.master, player);
    }
    this._players.push(player);
    return true;
  }

  removePlayer(player) {
    if (player.type === playerType.SPECTATOR) {
      if (this.state === roomState.BUSY) {
        this._game.removeSpectator(player);
      }
    } else {
      const toRm = this._players.findIndex(p => player.id === p.id);
      if (toRm === -1) {
        return false;
      }
      if (this._game !== null) {
        this._game.removePlayer(this._players[toRm], true);
      }
      this._players.splice(toRm, 1);
      // Solo, player left so just delete the party and the room
      if (this._players.length === 0) {
        this.stop();
        this._lobby.deleteRoom(this._name);
      }
      // Multi, end the party if only 1 player left
      if (this._players.length === 1) {
        this.stop();
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

  get game() {
    return this._game;
  }

  getPlayerType(player) {
    if (this.isMaster(player)) {
      return playerType.MASTER;
    }
    if (this.state === roomState.BUSY) {
      if (this._game.isSpectator(player) === true) {
        return playerType.SPECTATOR;
      }
      if (this._game.isPlayer(player) === true) {
        return playerType.SLAVE;
      }
    }
    return playerType.NONE;
  }

  // Create a new game instance
  start(player) {
    if (!this.isMaster(player)) {
      return 'Player is not master';
    }
    this.state = roomState.BUSY;
    this._game = new Game(this._mode, GAME_SPEED.NORMAL, this.players);
    return null;
  }

  restart(player) {
    this.stop();
    return this.start(player);
  }

  stop() {
    if (this.state === roomState.BUSY) {
      this._game.stop();
      delete this._game;
      this._game = null;
    }
    this.state = roomState.FREE; // Sera set quand le master relance la partie
  }

  serialize() {
    return {
      name: this.name,
      state: this.state,
      slots: [this.freeSlots(), this._players.length, this.slots],
      master: (this.master === null) ? '' : this.master.name,
      players: Object.values(this._players).map(v => v.serialize()),
      mode: this.mode,
    };
  }
}
