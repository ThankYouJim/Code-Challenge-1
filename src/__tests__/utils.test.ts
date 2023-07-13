import { isPlaceCommandValid, parsePlaceCommand } from "../utils";

describe("Utils", () => {
  test("isPlaceCommandValid - true", () => {
    expect(isPlaceCommandValid("PLACE0,0,NORTH")).toBe(true);
  });
  test("isPlaceCommandValid - false", () => {
    expect(isPlaceCommandValid("PLACE10,10,NORTH")).toBe(false);
  });
  test("isPlaceCommandValid - false (bad format)", () => {
    expect(isPlaceCommandValid("bad format")).toBe(false);
  });
  test("parsePlaceCommand", () => {
    const expected = [0, 0, 3];
    expect(parsePlaceCommand("PLACE0,0,WEST")).toEqual(expected);
  });
  test("parsePlaceCommand - throw error", () => {
    expect(() => parsePlaceCommand("PLACE0,0,BAD")).toThrow();
  });
});
