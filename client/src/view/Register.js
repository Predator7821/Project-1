import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Register.css";
import { SERVER_URL } from "../constants/const";

const Register = () => {
  const [pass, setPass] = useState();
  const [flag, setFlag] = useState(false);
  const [userData, setUserData] = useState({
    Username: "",
    fullname: "",
    Email: "",
    Password: "",
  });
  const passwordStrength =
    /^.*(?=.{12,20})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;

  const handle = (e) => {
    const newData = { ...userData };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
    console.log(newData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (userData.Password.match(passwordStrength)) {
      setPass(true);
      axios
        .post(`${SERVER_URL}/api/users`, {
          Username: userData.Username,
          fullname: userData.fullname,
          Email: userData.Email,
          Password: userData.Password,
          Age: userData.Age,
        })
        .then((res) => {
          console.log(userData);
          console.log(res);
        });
      setFlag(true);
    } else {
      console.log("err");
      setPass(false);
    }
  };

  return (
    <div className="lotsOfPads">
      <TextField
        sx={{ margin: 1 }}
        name="Username"
        onChange={(e) => handle(e)}
        value={userData.Username}
        label="Username"
        variant="outlined"
      />
      <TextField
        sx={{ margin: 1 }}
        name="fullname"
        value={userData.fullname}
        onChange={(e) => handle(e)}
        label="fullname"
        variant="outlined"
      />
      <TextField
        sx={{ margin: 1 }}
        name="Email"
        value={userData.Email}
        onChange={(e) => handle(e)}
        label="Email"
        variant="outlined"
      />
      <div className="wrongpass">
        <TextField
          sx={{ margin: 1 }}
          label="password"
          type="password"
          variant="outlined"
          name="Password"
          value={userData.Password}
          onChange={(e) => handle(e)}
        />
        {pass ? (
          <p></p>
        ) : (
          <p>
            a password must contain an upper case and lower case letter numbers
            symboles and must be 12 chars or longer
          </p>
        )}
      </div>
      <TextField
        sx={{ margin: 1 }}
        label="Age"
        variant="outlined"
        name="Age"
        value={userData.Age}
        onChange={(e) => handle(e)}
      />
      {flag ? (
        <Button onClick={(e) => handleRegister(e)} variant="outlined">
          <Link to={"/"}>Register</Link>
        </Button>
      ) : (
        <Button onClick={(e) => handleRegister(e)} variant="outlined">
          Register
        </Button>
      )}
    </div>
  );
};

export default Register;
