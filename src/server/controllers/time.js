const proc = require('process');

export default function timeNow() {
  const now = proc.hrtime();
  return now[1] / 1000 + now[0] * 1000000;
}
