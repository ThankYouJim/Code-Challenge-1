import {
  LEFT,
  RIGHT,
  MOVE,
  DIRECTIONS,
  NORTH,
  EAST,
  SOUTH,
  WEST,
} from "./constants";

const n = DIRECTIONS.length;

export class Pacman {
  x: number;
  y: number;
  f: number;

  constructor(x: number, y: number, f: number) {
    this.x = x;
    this.y = y;
    this.f = f;
  }

  move(command) {
    switch (command) {
      case LEFT:
      case RIGHT:
        const change = command === LEFT ? -1 : 1;
        this.f = (((this.f + change) % n) + n) % n;
        break;
      case MOVE:
        const facing = DIRECTIONS[this.f];
        switch (facing) {
          case NORTH:
            this.y += 1;
            break;
          case EAST:
            this.x += 1;
            break;
          case SOUTH:
            this.y -= 1;
            break;
          case WEST:
            this.x -= 1;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  report() {
    return `${this.x},${this.y},${DIRECTIONS[this.f]}`;
  }
}
