import { useState } from "react";

import {
  CurrentUserContext,
  LoginContext,
  SearchResultsContext,
  CatSearchContext,
  CheckPremiumContext,
  User_IdContext,
  MovieFetchContext,
  MovieAgeContext,
  UserDataContext,
} from "./context/Passdata";
import Main from "./view/Main";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [results, setResults] = useState("");
  const [searchCat, setSearchCat] = useState("Movies");
  const [isPremium, setIsPremium] = useState(false);
  const [userid, setUserid] = useState("");
  const [bestOfDaBest, setBestOfDaBest] = useState([]);
  const [movieAge, setMovieAge] = useState("");
  const [userData, setUserData] = useState({});
  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <SearchResultsContext.Provider value={{ results, setResults }}>
            <CatSearchContext.Provider value={{ searchCat, setSearchCat }}>
              <CheckPremiumContext.Provider value={{ isPremium, setIsPremium }}>
                <User_IdContext.Provider value={{ userid, setUserid }}>
                  <MovieFetchContext.Provider
                    value={{ bestOfDaBest, setBestOfDaBest }}
                  >
                    <MovieAgeContext.Provider value={{ movieAge, setMovieAge }}>
                      <UserDataContext.Provider
                        value={{ userData, setUserData }}
                      >
                        <Main />
                      </UserDataContext.Provider>
                    </MovieAgeContext.Provider>
                  </MovieFetchContext.Provider>
                </User_IdContext.Provider>
              </CheckPremiumContext.Provider>
            </CatSearchContext.Provider>
          </SearchResultsContext.Provider>
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
