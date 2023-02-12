import "./App.css";
import { useState } from "react";
import {
  Currentusercontext,
  Logincontext,
  Searchresultscontext,
} from "./context/Passdata";
import Main from "./view/Main";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [results, setResults] = useState("");
  return (
    <>
      <Logincontext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Currentusercontext.Provider value={{ currentUser, setCurrentUser }}>
          <Searchresultscontext.Provider value={{ results, setResults }}>
            <Main />
          </Searchresultscontext.Provider>
        </Currentusercontext.Provider>
      </Logincontext.Provider>
    </>
  );
}

export default App;
