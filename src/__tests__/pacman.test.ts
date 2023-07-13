import Pacman from "../Pacman";
import { DIR, MOVE } from "../constants";

describe("Pacman", () => {
  let testMan;
  beforeEach(() => {
    testMan = new Pacman(0, 0, 0);
  });
  test("Rotate left", () => {
    testMan.move(DIR.LEFT);
    const report = testMan.report();
    expect(report).toBe("0,0,WEST");
  });
  test("Rotate right", () => {
    testMan.move(DIR.RIGHT);
    const report = testMan.report();
    expect(report).toBe("0,0,EAST");
  });
  test("Move valid", () => {
    testMan.move(MOVE);
    const report = testMan.report();
    expect(report).toBe("0,1,NORTH");
  });
  test("Move invalid", () => {
    testMan.move(DIR.LEFT);
    console.log(testMan.report());
    testMan.move(MOVE);
    const report = testMan.report();
    expect(report).toBe("0,0,WEST");
  });
  test("Placed pacman elsewhere", () => {
    testMan.move(MOVE);
    testMan.place(4, 4, 2);
    testMan.move(MOVE);
    testMan.move(MOVE);
    testMan.move(DIR.LEFT);
    const report = testMan.report();
    expect(report).toBe("4,2,EAST");
  });
});
