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

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { isPremium, setIsPremium } = useContext(CheckPremiumContext);
  const { movieAge, setMovieAge } = useContext(MovieAgeContext);
  const { userId, setUserid } = useContext(User_IdContext);
  const { setUserData } = useContext(UserDataContext);
  const [loading, setLoading]=useState(false)
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const loginInfo = {
    name: "",
    password: "",
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
    setCurrentUser(false);
    setMovieAge(false);
    setUserid(false);
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
        setUserid(user[i]._id);
        setUserData(user[i]);
        if (user[i].premium === true) {
          setIsPremium(true);
        }
      }
    }
  };
  
  useEffect(() => {
    setLoading(true)
    axios({
      method:"GET",
      url:"http://127.0.0.1:8000/api/users"
    }).then((res)=>{
      console.log(res.data);
      setUser(res.data)
    }).catch((e)=>console.log(e)).finally(()=>setLoading(false))
  }, []);

  return (
    <div className="extenedTheMistake">
      {loading &&(
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif" alt=""/>
      )}
      {isLoggedIn ? (
        <div>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      ) : (
        <div className="lotsOfPads">
          <TextField
            onBlur={(event) => {
              loginInfo.name = event.target.value;
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
              loginInfo.password = event.target.value;
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
