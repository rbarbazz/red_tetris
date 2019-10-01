
export default class Score {
  constructor() {
    this.lines = 0;
    this.pts = 0;
    this.lvl = 1;
  }

  addLineBreak(n) {
    this.lines += n;
    this.pts = n * 100;
    this.lvl = this.updateLvl();
  }

  updateLvl() {
    if (this.lines < 2) this.lvl = 1;
    else if (this.lines < 3) this.lvl = 2;
    else if (this.lines < 5) this.lvl = 3;
    else if (this.lines < 7) this.lvl = 4;
    else if (this.lines < 10) this.lvl = 5;
    else this.lvl = 6;
  }

  serialize() {
    return { lines: this.lines, lvl: this.lvl, pts: this.pts };
  }
}
