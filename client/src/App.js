import "./App.css";
import { useState } from "react";
import { Logincontext } from "./context/Passdata";
import Main from "./view/Main";
function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      <Logincontext.Provider value={{ login, setLogin }}>
        <Main />
      </Logincontext.Provider>
    </>
  );
}

export default App;
