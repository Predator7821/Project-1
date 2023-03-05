import { useState } from "react";

import {
  Currentusercontext,
  Logincontext,
  Searchresultscontext,
  Catsearchcontext,
  Checkpremiumcontext,
  User_idcontext,
  Moviefetchcontext,
  Movieagecontext,
  UserDataContext,
} from "./context/Passdata";
import Main from "./view/Main";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [results, setResults] = useState("");
  const [searchCat, setSearchCat] = useState("Movies");
  const [ispremium, setIspremium] = useState(false);
  const [userid, setUserid] = useState("");
  const [bestofdabest, setBestofdabest] = useState([]);
  const [movieAge, setMovieAge] = useState("");
  const [userData, setUserData] = useState({});
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
                    <Movieagecontext.Provider value={{ movieAge, setMovieAge }}>
                      <UserDataContext.Provider
                        value={{ userData, setUserData }}
                      >
                        <Main />
                      </UserDataContext.Provider>
                    </Movieagecontext.Provider>
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
