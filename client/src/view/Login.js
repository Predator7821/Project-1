import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  
  // const user={
  //     "Username": ,
  //     "Password": ,
  //     "Email": ,
  //     "dob": ,
  //     "first_name":,
  //     "last_name":,
  //   }
  const getUser = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/users");
    const test2  = await test1.json();
    setUser(test2);
  };
  const userObj={}
  useEffect(() => {
    getUser();
  }, []);
  const handleChange = () => {
    console.log(userObj);
  };
  return (
    <div className="extenedthemistake">
      {login ? (
        <div>
          <Button onClick={() => setLogin(false)}>Logout</Button>
        </div>
      ) : (
        <div className="lotsfopads">
          <TextField
            onChange={(event) => {
              userObj.name = event.target.value;
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
            onChange={(event) => {
              userObj.password = event.target.value;
            }}
          />
          <div>
            <Button onClick={() => handleChange()} variant="outlined">
              Login
            </Button>
            <Button variant="outlined">
              <Link to={"/register"}>Register</Link>
            </Button>
          </div>
          <Button variant="outlined">Forgot Pass?</Button>
        </div>
      )}
    </div>
  );
};

export default Login;
