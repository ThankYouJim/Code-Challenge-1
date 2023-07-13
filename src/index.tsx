import { render } from "preact";
import { useState } from "preact/hooks";
import "./style.css";

export function App() {
  const [text, setText] = useState("");

  function validate() {
    alert(text);
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
      <div id="error" style="color: red"></div>
      <br />
      <button onClick={validate}>Go!</button>
    </>
  );
}

render(<App />, document.getElementById("app"));
