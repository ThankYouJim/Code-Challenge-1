import { CARDINAL } from "./constants";

const coordRegex = /([0-4]),([0-4]),(NORTH|SOUTH|EAST|WEST)$/;
const fullRegex = new RegExp("PLACE" + coordRegex.source);

export function isPlaceCommandValid(command: string) {
  return fullRegex.test(command);
}

export function parsePlaceCommand(command: string) {
  // if PLACE x,y,f regex is invalid, throw error
  if (!isPlaceCommandValid(command)) {
    throw new Error("Invalid PLACE coordinates!");
  }
  const coords = command.match(coordRegex);
  const x = parseInt(coords[1]);
  const y = parseInt(coords[2]);
  const f = CARDINAL.findIndex((d) => d === coords[3]);
  return [x, y, f];
}
