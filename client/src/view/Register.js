import React from "react";
import { TextField, Button } from "@mui/material";
import "./Register.css";
export const Fulluser = {};
const Register = () => {
  const handleChange = () => {
    console.log(Fulluser);
  };

  return (
    <div className="lotsfopads">
      <TextField
        onChange={(event) => {
          Fulluser.username = event.target.value;
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          Fulluser.fullname = event.target.value;
        }}
        id="outlined-basic"
        label="fullname"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          Fulluser.email = event.target.value;
        }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
      />
      <TextField
        onChange={(event) => {
          Fulluser.password = event.target.value;
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
