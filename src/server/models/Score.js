
export default class Score {
  constructor(lvl = 1) {
    this.lines = 0;
    this.pts = 0;
    this.lvl = lvl;
    this.last_combo = false;
  }

  scoreFromCombo(lines, harddrop) {
    let score = 0;
    // If linebreak
    if (lines > 0) {
      switch (lines) {
        case 1: score = 100 * this.lvl; break;
        case 2: score = 300 * this.lvl; break;
        case 3: score = 500 * this.lvl; break;
        case 4: score = 800 * this.lvl; break;
        default: score = 0; break;
      }
      if (this.last_combo === true) {
        score += lines * this.lvl + 50 * this.lvl;
      }
    }
    // 4 pts per piece, x2 if hard drop
    score += (harddrop === true) ? 8 : 4;
    return score;
  }

  compute(lines, hardrop) {
    this.lines += lines;
    this.pts += this.scoreFromCombo(lines, hardrop);
    this.lvl = this.computeLvl();
    if (lines > 0) this.last_combo = true;
    else this.last_combo = false;
  }

  // Increase lvl, 1-5 fixed, 6+ -> 1 lvl every 10 lines
  computeLvl() {
    if (this.lines <= 0) return 1;
    if (this.lines <= 1) return 2;
    if (this.lines <= 3) return 3;
    if (this.lines <= 6) return 4;
    if (this.lines <= 10) return 5;
    return 5 + Math.floor((this.lines - 10) / 10);
  }

  serialize() {
    return { lines: this.lines, lvl: this.lvl, pts: this.pts };
  }
}
