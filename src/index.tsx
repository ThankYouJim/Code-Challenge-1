import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import Pacman from "./Pacman";
import { parsePlaceCommand } from "./utils";

export function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  // TODO: if theres more than 1 place, there could be more reports?
  // useState([])?
  const [report, setReport] = useState("");

  function validate(data: String) {
    try {
      setError("");
      setReport("");
      const result = run(data);
      setReport(result);
    } catch (error) {
      setError(error.message);
    }
  }

  function run(data: String) {
    // clean up next lines and put all commands in an array
    const regex = /\n+/g;
    const array = data
      .replace(regex, "\n")
      .split("\n")
      .map((cmd) => cmd.replace(/\s/g, "")) // remove spaces
      .filter((cmd) => cmd !== ""); // remove empty
    const size = array.length;

    // check for REPORT, notify user that they don't have it
    //if (!(array[size - 1] === "REPORT")) {
    //  throw new Error("Please finish your commands with a REPORT");
    //}

    // TODO: is there a point of execution that doesn't have a REPORT at the end if there's a new PLACE right after?
    // discard all commands above PLACE
    const firstCommandIndex = array.findIndex((command) =>
      command.startsWith("PLACE")
    );
    const sanitised = array.slice(firstCommandIndex);
    const placeCommand = sanitised[0];

    // init John Pacman with the PLACE input
    const [x, y, f] = parsePlaceCommand(placeCommand);
    const john = new Pacman(x, y, f);
    // TODO: skip commands if PLACE is invalid
    sanitised.forEach((command) => john.move(command));
    return john.report();
  }

  return (
    <>
      <label for="command">Command</label>
      <br />
      <textarea
        id="command"
        rows={10}
        cols={40}
        placeholder="Start"
        onChange={(e) => setText((e.target as HTMLInputElement).value)}
      ></textarea>
      <div id="error" style={{ color: "red" }}>
        {error}
      </div>
      <br />
      <button onClick={() => validate(text)}>Go!</button>
      {report && <div style={{ color: "green" }}>Output: {report}</div>}
    </>
  );
}

render(<App />, document.getElementById("app"));
