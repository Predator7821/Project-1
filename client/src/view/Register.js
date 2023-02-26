import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    Username: "",
    fullname: "",
    Email: "",
    Password: "",
  });

  const handle = (e) => {
    const newdata = { ...userData };
    newdata[e.target.name] = e.target.value;
    setUserData(newdata);
    console.log(newdata);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/users", {
        Username: userData.Username,
        fullname: userData.fullname,
        Email: userData.Email,
        Password: userData.Password,
        Age: userData.Age,
      })
      .then((res) => {
        console.log(userData);
      });
  };

  return (
    <div className="lotsfopads">
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
        <Link to={"/login"}>Register</Link>
      </Button>
    </div>
  );
};

export default Register;
