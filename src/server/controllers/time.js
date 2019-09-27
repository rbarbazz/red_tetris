const proc = require('process');

export default function timeNow() {
  const now = proc.hrtime();
  return parseInt(now[1] / 1000 + now[0] * 1000000, 10);
}
