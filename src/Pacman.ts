import { DIR, CARDINAL, MOVE, REPORT } from "./constants";
import { parsePlaceCommand } from "./utils";

export default class Pacman {
  x: number;
  y: number;
  f: number;
  journey: string[];

  constructor() {
    this.journey = [];
  }

  place(x: number, y: number, f: number) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  control(command: string) {
    const n = CARDINAL.length;
    switch (command) {
      case DIR.LEFT:
        this.f = (((this.f + -1) % n) + n) % n;
        this.print();
        break;
      case DIR.RIGHT:
        this.f = (((this.f + 1) % n) + n) % n;
        this.print();
        break;
      case MOVE:
        {
          const facing = CARDINAL[this.f];
          switch (facing) {
            case DIR.NORTH:
              this.y = this.check(this.y, 1);
              break;
            case DIR.EAST:
              this.x = this.check(this.x, 1);
              break;
            case DIR.SOUTH:
              this.y = this.check(this.y, -1);
              break;
            case DIR.WEST:
              this.x = this.check(this.x, -1);
              break;
            default:
              break;
          }
        }
        break;
      case REPORT:
        this.journey.push(this.report());
        break;
      default:
        const [x, y, f] = parsePlaceCommand(command);
        this.place(x, y, f);
        break;
    }
  }

  report() {
    return `${this.x},${this.y},${CARDINAL[this.f]}`;
  }

  print() {
    console.log(this.report());
  }

  check(pt: number, change: number) {
    const tmp = pt + change;
    if (tmp < 0 || tmp > 4) return pt;
    return tmp;
  }

  getJourney() {
    return this.journey;
  }
}
