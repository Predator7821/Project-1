import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import "./Register.css";
import axios from "axios";
export const fulluser = {};
const Register = () => {
  const handleChange = () => {
    console.log(fulluser);
    useEffect(() => {
      axios.post("http://127.0.0.1:8000/api/users", fulluser);
    }, []);
  };

  return (
    <div className="lotsfopads">
      <TextField
        onChange={(event) => {
          fulluser.username = event.target.value;
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          fulluser.fullname = event.target.value;
        }}
        id="outlined-basic"
        label="fullname"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          fulluser.email = event.target.value;
        }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          fulluser.password = event.target.value;
        }}
        id="outlined-basic"
        label="password"
        type="password"
        variant="outlined"
      />
      <Button onClick={() => handleChange()} variant="outlined">
        Register
      </Button>
    </div>
  );
};

export default Register;
