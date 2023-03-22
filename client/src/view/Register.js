import React, { useState } from "react";
import { TextField, Button, FormControl,OutlinedInput,InputAdornment,IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import "./Register.css";
import { SERVER_URL } from "../constants/const";

const Register = () => {
  const navigate = useNavigate()
  const [pass, setPass] = useState();
  const [showPassword, setShowPassword]=useState(false);
  const [userData, setUserData] = useState({
    Username: "",
    fullname: "",
    Email: "",
    Password: "",
  });

  const passwordStrength =
    /^.*(?=.{12,20})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
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
          navigate('/login');
        });
    } else {
      console.log("err");
      setPass(false);
    }
  };

  return (
    <div className="lotsOfPads">
      <div className="flexTheFields">
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
          <OutlinedInput
            label="password"
            variant="outlined"
            name="Password"
            type={showPassword ? "text" : "password"}
            value={userData.Password}
            onChange={(e) => handle(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        <TextField
          sx={{ margin: 1 }}
          label="Age"
          variant="outlined"
          name="Age"
          value={userData.Age}
          onChange={(e) => handle(e)}
        />
        </FormControl>

        <Button onClick={(e) => handleRegister(e)} variant="outlined">
            Register
          </Button>
      </div>
      <div className="wrongpass">
        {pass ? (
          <p></p>
        ) : (
          <p>
            a password must contain an upper case and lower case letter numbers
            symboles and must be 12 chars or longer
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
