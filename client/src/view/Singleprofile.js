import React, { useContext, useState } from "react";
import "./Singleprofile.css";
import { User_idcontext, Cartcontext } from "../context/Passdata";
import { Button } from "@mui/material";
import axios from "axios";
import { Typography, Card, CardContent } from "@mui/material";
const Singleprofile = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
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
      <div>
        {state.map((item, index) => {
          return (
            <Card sx={{ maxHeight: 500 }} key={index}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.name}
                </Typography>
              </CardContent>
              <Button
                onClick={() => dispatch({ type: "REMOVE", payload: item })}
              >
                remove
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Singleprofile;
