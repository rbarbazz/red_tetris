import params from '../params';
import * as server from './index';


server.create(params.server)
  .then(() => server.loginfo('not yet ready to play tetris with U ...'));
