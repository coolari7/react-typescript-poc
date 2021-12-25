import React from "react";
import "./App.css";
import { Button } from "./components/Buttons/Button";

function App() {
  const [visible, setVisibility] = React.useState(false);

  return (
    <>
      <Button type="button" onClick={() => setVisibility(!visible)}>
        Show Backdrop
      </Button>
    </>
  );
}

export default App;
