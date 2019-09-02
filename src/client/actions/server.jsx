import { eventType, msgType } from '../../common/enums';

export const ping = () => ({
  eventType: eventType.LOBBY,
  type: msgType.PING,
});

export default ping;
