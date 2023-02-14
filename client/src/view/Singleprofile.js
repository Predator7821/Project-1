import React, { useContext, useState } from "react";
import "./Singleprofile.css";
import { User_idcontext } from "../context/Passdata";
import { Button } from "@mui/material";
import axios from "axios";
const Singleprofile = () => {
  const { userid, setUserid } = useContext(User_idcontext);
  const [userData, setUserData] = useState({
    Bio: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        Bio: userData.Bio,
      })
      .then((res) => {
        console.log(userData);
      });
  };
  const handle = (e) => {
    const newdata = { ...userData };
    newdata[e.target.name] = e.target.value;
    setUserData(newdata);
    console.log(newdata);
  };
  return (
    <div className="theheaderissodiff">
      <textarea
        onChange={(e) => handle(e)}
        value={userData.Bio}
        name="Bio"
        className="sizebio"
      ></textarea>
      <Button onClick={handlesubmit}>update bio</Button>
    </div>
  );
};

export default Singleprofile;
