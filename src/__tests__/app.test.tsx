import { expect } from "expect";
import { render, fireEvent, screen, waitFor } from "@testing-library/preact";

import Counter from "../Counter";

describe("Counter", () => {
  test("should display initial count", () => {
    const { container } = render(<Counter initialCount={5} />);
    expect(container.textContent).toMatch("Current value: 5");
    //expect(true).toBe(true);
  });
});
