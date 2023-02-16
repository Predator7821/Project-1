import "./App.css";
import { useState } from "react";
import {
  Currentusercontext,
  Logincontext,
  Searchresultscontext,
  Catsearchcontext,
  Checkpremiumcontext,
  User_idcontext,
  Moviefetchcontext,
  Passdata,
} from "./context/Passdata";
import Main from "./view/Main";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [results, setResults] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [ispremium, setIspremium] = useState(false);
  const [userid, setUserid] = useState("");
  const [bestofdabest, setBestofdabest] = useState([]);
  return (
    <>
      <Logincontext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Currentusercontext.Provider value={{ currentUser, setCurrentUser }}>
          <Searchresultscontext.Provider value={{ results, setResults }}>
            <Catsearchcontext.Provider value={{ searchCat, setSearchCat }}>
              <Checkpremiumcontext.Provider value={{ ispremium, setIspremium }}>
                <User_idcontext.Provider value={{ userid, setUserid }}>
                  <Moviefetchcontext.Provider
                    value={{ bestofdabest, setBestofdabest }}
                  >
                    <Passdata>
                      <Main />
                    </Passdata>
                  </Moviefetchcontext.Provider>
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
