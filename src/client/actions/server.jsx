export const CLIENT_PING = 'CLIENT_PING';
export const SERVER_PONG = 'SERVER_PONG';

const ping = () => ({
  type: CLIENT_PING,
});

export default ping;
