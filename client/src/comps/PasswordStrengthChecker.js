import { TextField } from "@mui/material";
import React, { useState } from "react";

function PasswordStrengthChecker({handle,userData}) {
  const [passwordInput, setPasswordInput] = useState("");
  const [poorPassword, setPoorPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordErr] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const passwordStrength = (evnt) => {
    const passwordValue = evnt.target.value;
    const passwordLength = passwordValue.length;
    const poorRegExp = /[a-z]/;
    const weakRegExp = /(?=.*?[0-9])/;
    const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
    const whitespaceRegExp = /^$|\s+/;
    const poorPassword = poorRegExp.test(passwordValue);
    const weakPassword = weakRegExp.test(passwordValue);
    const strongPassword = strongRegExp.test(passwordValue);
    const whiteSpace = whitespaceRegExp.test(passwordValue);

    if (passwordValue === "") {
      setPasswordErr("Password is Empty");
    } else {
      // to check whitespace
      if (whiteSpace) {
        setPasswordErr("Whitespaces are not allowed");
      }
      // to check poor password
      if (
        passwordLength <= 3 &&
        (poorPassword || weakPassword || strongPassword)
      ) {
        setPoorPassword(true);
        setPasswordErr("Password is Poor");
      }
      // to check weak password
      if (
        passwordLength >= 4 &&
        poorPassword &&
        (weakPassword || strongPassword)
      ) {
        setWeakPassword(true);
        setPasswordErr("Password is Weak");
      } else {
        setWeakPassword(false);
      }
      // to check strong Password
      if (
        passwordLength >= 6 &&
        poorPassword &&
        weakPassword &&
        strongPassword
      ) {
        setStrongPassword(true);
        setPasswordErr("Password is Strong");
      } else {
        setStrongPassword(false);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-sm-4">
      <TextField
        label="password"
        type="password"
        variant="outlined"
        name="Password"
        value={userData.Password}
        onChange={(e) => handle(e)}
        handlePasswordChange={handlePasswordChange}
          passwordValue={passwordInput}
          passwordStrength={passwordStrength}
      />
      </div>
    </div>
  );
}
export default PasswordStrengthChecker;
