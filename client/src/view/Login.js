import React from "react";
import { Button, TextField } from "@mui/material";
import "./Login.css";
const Login = () => {
    // const user={
    //     "Username": ,
    //     "Password": ,
    //     "Email": ,
    //     "dob": ,
    //     "first_name":,
    //     "last_name":,
    //   }
    const handleChange =(e)=>{
        
    };
  return (
    <div className="lotsfopads">
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <div className="fixitok">
        <TextField id="outlined-basic" label="first name" variant="outlined" />
        <TextField id="outlined-basic" label="last name" variant="outlined" />
      </div>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField
        id="outlined-basic"
        label="password"
        type="password"
        variant="outlined"
      />
      <Button onClick={()=> handleChange()} variant="outlined">Register</Button>
    </div>
  );
};

export default Login;
