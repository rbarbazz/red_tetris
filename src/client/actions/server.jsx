export const CLIENT_PING = 'PINGPONG';
export const CLIENT_CLOSE = 'CLIENT_CLOSE';
export const SERVER_PONG = 'PINGPONG';

export const ping = () => ({
  type: CLIENT_PING,
});

export default ping;
