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
  const handleChange = (e) => {};
  return (
    <div className="extenedthemistake">
      {login ? (
        <div>
          <Button onClick={() => setLogin(false)}>Logout</Button>
        </div>
      ) : (
        <div className="lotsfopads">
          <TextField
            id="outlined-basic"
            label="UsernName/Email"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="password"
            type="password"
            variant="outlined"
          />
          <div>
            <Button variant="outlined">Login</Button>
            <Button variant="outlined">
              <Link to={"/register"}>Cant Login ?</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
