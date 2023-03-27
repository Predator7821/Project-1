import { useState, useEffect } from "react";

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
  AchiveThePremiumContext,
  FlagContext,
} from "./context/Passdata";
import Main from "./view/Main";
import "./App.css";
import { AMOUNT_OF_TIME_TO_STAY_LOGGED_IN_WITH_MS } from "./constants/const";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [results, setResults] = useState("");
  const [searchCat, setSearchCat] = useState("Movies");
  const [isPremium, setIsPremium] = useState(false);
  const [userId, setUserId] = useState("");
  const [bestOfDaBest, setBestOfDaBest] = useState([]);
  const [movieAge, setMovieAge] = useState(false);
  const [userData, setUserData] = useState({});
  const [premium, setPremium] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    localStorage.getItem("auth") >
    Date.now() - AMOUNT_OF_TIME_TO_STAY_LOGGED_IN_WITH_MS
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.getItem("user");
    }
  }, [isLoggedIn]);
  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <SearchResultsContext.Provider value={{ results, setResults }}>
            <CatSearchContext.Provider value={{ searchCat, setSearchCat }}>
              <CheckPremiumContext.Provider value={{ isPremium, setIsPremium }}>
                <User_IdContext.Provider value={{ userId, setUserId }}>
                  <MovieFetchContext.Provider
                    value={{ bestOfDaBest, setBestOfDaBest }}
                  >
                    <MovieAgeContext.Provider value={{ movieAge, setMovieAge }}>
                      <UserDataContext.Provider
                        value={{ userData, setUserData }}
                      >
                        <AchiveThePremiumContext.Provider
                          value={{ premium, setPremium }}
                        >
                          <FlagContext.Provider value={{ flag, setFlag }}>
                            <Main />
                          </FlagContext.Provider>
                        </AchiveThePremiumContext.Provider>
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
