import { render } from "preact";
import { useState } from "preact/hooks";
import Pacman from "./Pacman";
import { isPlaceCommandValid } from "./utils";
import "./style.css";
import { REPORT } from "./constants";

export function App() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [reports, setReports] = useState([]);
  const [ignored, setIgnored] = useState(0);

  function run(data: string) {
    try {
      setError("");
      setReports([]);
      setIgnored(0);

      // clean up next lines and put all commands in an array
      const array = data
        .toUpperCase()
        .split("\n")
        .map((cmd) => cmd.replace(/\s/g, "")) // remove spaces
        .filter((cmd) => cmd !== ""); // remove empty

      // only spaces or empty
      if (array.length == 0) throw new Error("Command empty.");

      // check for REPORT, notify user that they don't have it
      if (!array.find((cmd) => cmd === "REPORT"))
        throw new Error("Please finish your commands with a REPORT");

      let isValid = false;
      let ignored = 0;
      let sanitised: string[] = [];
      for (let i = 0; i < array.length; i++) {
        // if the current PLACE is valid, add the commands until it's not
        const curr = array[i];
        if (curr.startsWith("PLACE")) {
          isValid = isPlaceCommandValid(curr);
        }
        if (isValid || curr === REPORT) {
          sanitised.push(array[i]);
        } else ignored++;
      }
      setIgnored(ignored);

      const john = new Pacman();
      sanitised.map((command, i) => {
        john.control(command);
      });
      setReports(john.getJourney());
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div class="pacman" />
      <label for="command">Command</label>
      <br />
      <textarea
        id="command"
        data-testid="command"
        rows={20}
        cols={30}
        placeholder="Start"
        onChange={(e) => setText((e.target as HTMLInputElement).value)}
        style={{ textTransform: "uppercase" }}
      ></textarea>
      <div id="error" data-testid="error" style={{ color: "red" }}>
        {error}
      </div>
      <br />
      <button onClick={() => run(text)}>Go!</button>

      {reports.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>{ignored} line(s) ignored.</div>
          <div style={{ color: "green" }}>
            <label>{reports.length} output(s): </label>
            <span>{reports.join(", ")}</span>
          </div>
        </div>
      )}
    </>
  );
}

render(<App />, document.getElementById("app"));
