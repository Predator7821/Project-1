import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    Username:'',
    fullname:'',
    Email:'',
    Password:''
  });
  const handle=(e)=>{
    const newdata={...userData}
    newdata[e.target.name]=e.target.value
    setUserData(newdata)
    console.log(newdata);
  }
  const handleRegister=(e)=>{
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/users",{
      Username:userData.Username,
      fullname:userData.fullname,
      Email:userData.Email,
      Password:userData.Password
    }).then(res=>{
      console.log(userData);
    })
  }
  return (
    <div className="lotsfopads">
      <TextField
        name="Username"
        onChange={(e)=>handle(e)}
        value={userData.Username}
        label="Username"
        variant="outlined"
      />
      <TextField
        name="fullname"
        value={userData.fullname}
        onChange={(e)=>handle(e)}
        label="fullname"
        variant="outlined"
      />
      <TextField
        name="Email"
        value={userData.Email}
        onChange={(e)=>handle(e)}
        label="Email"
        variant="outlined"
      />
      <TextField
        label="password"
        type="password"
        variant="outlined"
        name="Password"
        value={userData.Password}
        onChange={(e)=>handle(e)}
      />
      <Button onClick={(e)=>handleRegister(e)} variant="outlined">
        Register
      </Button>
    </div>
  );
};

export default Register;
