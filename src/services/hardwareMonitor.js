import WS from '../utils/ws';
import { getUser } from '../utils/auth';

const HARDWAREMONITOR_API_V1 = 'ws://127.0.0.1:3001/hardwareMonitor';

export const getHardwareMonitor = async () => {
  const ws = new WS();
  await ws.join(HARDWAREMONITOR_API_V1, getUser().token);
  return ws;
};
