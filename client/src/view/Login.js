import React, { useEffect, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

import {
  Checkpremiumcontext,
  Currentusercontext,
  Logincontext,
  Movieagecontext,
  User_idcontext,
  UserDataContext,
} from "../context/Passdata";
import "./Login.css";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Logincontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const { ispremium, setIspremium } = useContext(Checkpremiumcontext);
  const { movieAge, setMovieAge } = useContext(Movieagecontext);
  const { userid, setUserid } = useContext(User_idcontext);
  const { setUserData } = useContext(UserDataContext);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const logininfo = {
    name: "",
    password: "",
  };

  const getUser = async () => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIspremium(false);
    setCurrentUser(false);
    setMovieAge(false);
    setUserid(false);
  };

  const handleChange = () => {
    for (let i = 0; i < user.length; i++) {
      if (
        logininfo.name === user[i].Username &&
        logininfo.password === user[i].Password
      ) {
        setMovieAge(user[i].Age);
        setIsLoggedIn(true);
        setUserid(user[i]._id);
        setUserData(user[i]);
        if (user[i].premium === true) {
          setIspremium(true);
        }
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="extenedthemistake">
      {isLoggedIn ? (
        <div>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      ) : (
        <div className="lotsfopads">
          <TextField
            onBlur={(event) => {
              logininfo.name = event.target.value;
              setCurrentUser(event.target.value);
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
              logininfo.password = event.target.value;
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
