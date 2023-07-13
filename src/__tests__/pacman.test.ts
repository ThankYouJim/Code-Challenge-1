import Pacman from "../Pacman";
import { DIR, MOVE } from "../constants";

describe("Pacman", () => {
  let testMan: Pacman;
  beforeEach(() => {
    testMan = new Pacman();
    testMan.place(0, 0, 0);
  });
  test("Rotate left", () => {
    testMan.control(DIR.LEFT);
    const report = testMan.report();
    expect(report).toBe("0,0,WEST");
  });
  test("Rotate right", () => {
    testMan.control(DIR.RIGHT);
    const report = testMan.report();
    expect(report).toBe("0,0,EAST");
  });
  test("Move valid", () => {
    testMan.control(MOVE);
    const report = testMan.report();
    expect(report).toBe("0,1,NORTH");
  });
  test("Move invalid", () => {
    testMan.control(DIR.LEFT);
    testMan.control(MOVE);
    const report = testMan.report();
    expect(report).toBe("0,0,WEST");
  });
  test("Placed pacman elsewhere", () => {
    testMan.control(MOVE);
    testMan.place(4, 4, 2);
    testMan.control(MOVE);
    testMan.control(MOVE);
    testMan.control(DIR.LEFT);
    const report = testMan.report();
    expect(report).toBe("4,2,EAST");
  });
});
