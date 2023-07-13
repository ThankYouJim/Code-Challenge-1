import { CARDINAL } from "./constants";

//export function readFile(fileName: String) {
//  const reader = new FileReader();
//  return reader.readAsText(fileName);
//}

export function parsePlaceCommand(command: string) {
  const coordRegex = /([0-4]),([0-4]),(NORTH|SOUTH|EAST|WEST)$/;
  const fullRegex = new RegExp("PLACE" + coordRegex);
  // if PLACE x,y,f regex is invalid, throw error
  if (!fullRegex.test(command)) {
    throw new Error("Invalid PLACE coordinates!");
  }
  const coords = command.match(coordRegex);
  const x = parseInt(coords[1]);
  const y = parseInt(coords[2]);
  const f = CARDINAL.findIndex((d) => d === coords[3]);
  return [x, y, f];
}
