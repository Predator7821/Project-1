import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({});

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  const handleRegister = async () => {
    const user = await axios.post("http://localhost:8000/api/users/", userData);
    console.log(user);
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div className="lotsfopads">
      <TextField
        name="Username"
        onBlur={(event) => {
          handleChange(event.target.name, event.target.value);
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
      />
      <TextField
        name="fullname"
        onBlur={(event) => {
          handleChange(event.target.name, event.target.value);
        }}
        id="outlined-basic"
        label="fullname"
        variant="outlined"
      />
      <TextField
        name="Email"
        onBlur={(event) => {
          handleChange(event.target.name, event.target.value);
        }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        onBlur={(event) => {
          handleChange(event.target.name, event.target.value);
        }}
        id="outlined-basic"
        label="password"
        type="password"
        variant="outlined"
        name="Password"
      />
      <Button onClick={handleRegister} variant="outlined">
        Register
      </Button>
    </div>
  );
};

export default Register;
