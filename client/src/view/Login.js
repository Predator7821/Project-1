import React, { useEffect, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  CheckPremiumContext,
  CurrentUserContext,
  LoginContext,
  MovieAgeContext,
  User_IdContext,
  UserDataContext,
} from "../context/Passdata";
import "./Login.css";
import { SERVER_URL } from "../constants/const";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { isPremium, setIsPremium } = useContext(CheckPremiumContext);
  const { movieAge, setMovieAge } = useContext(MovieAgeContext);
  const { userId, setUserId } = useContext(User_IdContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [loginInfo, setLoginInfo] = useState({ name: "", password: "" });

  const logout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
    setCurrentUser(false);
    setMovieAge(false);
    setUserId(false);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("MOVIE_AGE_STORAGE");
    localStorage.removeItem("IS_LOGGED_IN_SOTRAGE");
    localStorage.removeItem("USER_ID_STORAGE");
    localStorage.removeItem("USER_DATA_STORAGE");
    localStorage.removeItem("IS_PREMIUM_STORAGE");
    localStorage.removeItem("CURRENT_USER");
  };

  const handleChange = () => {
    console.log(loginInfo);
    for (let i = 0; i < user.length; i++) {
      if (
        loginInfo.name === user[i].Username &&
        loginInfo.password === user[i].Password
      ) {
        setMovieAge(user[i].Age);
        setIsLoggedIn(true);
        setUserId(user[i]._id);
        setUserData(user[i]);
        if (user[i].premium === true) {
          setIsPremium(true);
        }
        localStorage.setItem("auth", Date.now());
        localStorage.setItem("user", loginInfo.name);
      }
    }
  };

  useEffect(() => {
    const movieAgeStorage = window.localStorage.getItem("MOVIE_AGE_STORAGE");
    if (movieAgeStorage !== null) setMovieAge(JSON.parse(movieAgeStorage));
    const isLoggedInStorage = window.localStorage.getItem(
      "IS_LOGGED_IN_SOTRAGE"
    );
    setIsLoggedIn(JSON.parse(isLoggedInStorage));
    const userIdStorage = window.localStorage.getItem("USER_ID_STORAGE");
    setUserId(JSON.parse(userIdStorage));
    const userDataStorage = window.localStorage.getItem("USER_DATA_STORAGE");
    setUserData(JSON.parse(userDataStorage));
    const isPremiumStorage = window.localStorage.getItem("IS_PREMIUM_STORAGE");
    setIsPremium(JSON.parse(isPremiumStorage));
    const currentUserStorage = window.localStorage.getItem("CURRENT_USER");
    setCurrentUser(JSON.parse(currentUserStorage));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MOVIE_AGE_STORAGE", JSON.stringify(movieAge));
    window.localStorage.setItem(
      "IS_LOGGED_IN_SOTRAGE",
      JSON.stringify(isLoggedIn)
    );
    window.localStorage.setItem("USER_ID_STORAGE", JSON.stringify(userId));
    window.localStorage.setItem("USER_DATA_STORAGE", JSON.stringify(userData));
    window.localStorage.setItem(
      "IS_PREMIUM_STORAGE",
      JSON.stringify(isPremium)
    );
    window.localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  }, [movieAge, isLoggedIn, userId, userData, isPremium, currentUser]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${SERVER_URL}/api/users`,
    })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="extenedTheMistake">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      {isLoggedIn ? (
        <div>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      ) : (
        <div className="lotsOfPads">
          <TextField
            onBlur={(event) => {
              setCurrentUser(event.target.value);
              setLoginInfo({ ...loginInfo, name: event.target.value });
            }}
            name="username"
            label="UsernName/Email"
            variant="outlined"
          />
          <TextField
            name="password"
            label="password"
            type="password"
            variant="outlined"
            onBlur={(event) => {
              setLoginInfo({ ...loginInfo, password: event.target.value });
            }}
          />
          <div>
            <Button onClick={handleChange} variant="outlined">
              Login
            </Button>
            <Button variant="outlined">
              <Link to={"/register"}>Register</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
