import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [login, setLogin] = useState(false);
  // const user={
  //     "Username": ,
  //     "Password": ,
  //     "Email": ,
  //     "dob": ,
  //     "first_name":,
  //     "last_name":,
  //   }
  const userObj = {};
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
            id="outlined-basic"
            label="UsernName/Email"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
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
