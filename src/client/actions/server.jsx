import { eventType, msgType } from '../../common/enums';


export const ping = () => ({
  type: msgType.PING,
  eventType: eventType.LOBBY,
});

export default ping;
