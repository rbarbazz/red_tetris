import { CONFIG, playerType } from '../../common/enums';

export class Player {
  constructor(name, sock) {
    this.name = name;
    this.sock = sock;
    this.type = playerType.NONE;
    this.room = null;
  }

  id() {
    return this.sock.id;
  }
}

export function checkPlayerName(name) {
  if (name.length < CONFIG.NAME_MIN || name.length > CONFIG.NAME_MAX) {
    return false;
  }
  return true;
}
