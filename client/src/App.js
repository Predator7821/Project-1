import "./App.css";
import { useState } from "react";
import {
  Currentusercontext,
  Logincontext,
  Searchresultscontext,
  Catsearchcontext,
  Checkpremiumcontext,
  User_idcontext,
} from "./context/Passdata";
import Main from "./view/Main";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [results, setResults] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [ispremium, setIspremium] = useState(false);
  const [userid, setUserid] = useState("");
  return (
    <>
      <Logincontext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Currentusercontext.Provider value={{ currentUser, setCurrentUser }}>
          <Searchresultscontext.Provider value={{ results, setResults }}>
            <Catsearchcontext.Provider value={{ searchCat, setSearchCat }}>
              <Checkpremiumcontext.Provider value={{ ispremium, setIspremium }}>
                <User_idcontext.Provider value={{ userid, setUserid }}>
                  <Main />
                </User_idcontext.Provider>
              </Checkpremiumcontext.Provider>
            </Catsearchcontext.Provider>
          </Searchresultscontext.Provider>
        </Currentusercontext.Provider>
      </Logincontext.Provider>
    </>
  );
}

export default App;
