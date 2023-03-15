import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Register.css";
import { SERVER_URL } from "../constants/const";

const Register = () => {
  const [userData, setUserData] = useState({
    Username: "",
    fullname: "",
    Email: "",
    Password: "",
  });

  const passLowCap = /[a-z]/;
  const passCap= /[A-Z]/;
  const weakRegExp = /(?=.*?[0-9])/;
  const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
  const whitespaceRegExp = /^$|\s+/;



  const handle = (e) => {
    const newData = { ...userData };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
    console.log(newData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if(userData.Password.includes(passLowCap)){
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
    }
    
  };

  return (
    <div className="lotsOfPads">
      <TextField
        name="Username"
        onChange={(e) => handle(e)}
        value={userData.Username}
        label="Username"
        variant="outlined"
      />
      <TextField
        name="fullname"
        value={userData.fullname}
        onChange={(e) => handle(e)}
        label="fullname"
        variant="outlined"
      />
      <TextField
        name="Email"
        value={userData.Email}
        onChange={(e) => handle(e)}
        label="Email"
        variant="outlined"
      />
      <TextField
        label="password"
        type="password"
        variant="outlined"
        name="Password"
        value={userData.Password}
        onChange={(e) => handle(e)}
      />
      <TextField
        label="Age"
        variant="outlined"
        name="Age"
        value={userData.Age}
        onChange={(e) => handle(e)}
      />
      <Button onClick={(e) => handleRegister(e)} variant="outlined">
        Register
      </Button>
    </div>
  );
};

export default Register;
