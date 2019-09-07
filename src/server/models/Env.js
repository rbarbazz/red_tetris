import { CONFIG } from '../../common/enums';
import Lobby from './Lobby';

export const timeline = [];
export const lobby = new Lobby(CONFIG.MAX_SLOT);
export const game = true;
