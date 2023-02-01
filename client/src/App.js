import { Button } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Menu from "./comps/Menu";
import Test from "./comps/Test";

function App() {
  const [menu, setMenu] = useState(false);
  return (
    <div>
      <Button onClick={() => setMenu(true)}>menu</Button>
      <Menu menu={menu} setMenu={setMenu} />
      <Test />
    </div>
  );
}

export default App;
