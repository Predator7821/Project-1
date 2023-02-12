import React, { useEffect, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";
import { Currentusercontext, Logincontext } from "../context/Passdata";
const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Logincontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const logininfo = {
    name: "",
    password: "",
  };
  console.log(login);
  const getUser = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/users");
    const test2 = await test1.json();
    setUser(test2);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleChange = () => {
    for (let i = 0; i < user.length; i++) {
      if (
        logininfo.name === user[i].Username &&
        logininfo.password === user[i].Password
      ) {
        setIsLoggedIn(true);
      } else {
        alert("wrong username or password");
      }
    }
  };
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
