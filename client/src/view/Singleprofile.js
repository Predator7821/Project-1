import React, { useContext, useEffect, useState } from "react";
import "./Singleprofile.css";
import { User_idcontext, Cartcontext } from "../context/Passdata";
import { Button } from "@mui/material";
import axios from "axios";
import { Typography, Card, CardContent } from "@mui/material";
import {
  Logincontext,
  Currentusercontext,
  Checkpremiumcontext,
  Movieagecontext,
} from "../context/Passdata";
import { Link } from "react-router-dom";
const Singleprofile = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(Logincontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);
  const { ispremium, setIspremium } = useContext(Checkpremiumcontext);
  const { movieAge, setMovieAge } = useContext(Movieagecontext);
  const Globalstate = useContext(Cartcontext);
  const [bio, setBio] = useState([]);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;
  const { userid, setUserid } = useContext(User_idcontext);
  const [userData, setUserData] = useState({
    Bio: "",
    pfp: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        Bio: userData.Bio,
        pfp: userData.pfp,
      })
      .then((res) => {});
  };
  const fetchbio = async () => {
    const test1 = await fetch(`http://127.0.0.1:8000/api/users/${userid}`);
    const test2 = await test1.json();
    setBio(test2);
  };
  useEffect(() => {
    fetchbio();
  }, []);
  const handle = (e) => {
    const newdata = { ...userData };
    newdata[e.target.name] = e.target.value;
    setUserData(newdata);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setIspremium(false);
    setCurrentUser(false);
    setMovieAge(false);
  };
  const [test, setTest] = useState("");
  const handleImage = (e) => {
    console.log(e.target.files);
    setTest(e.target.files[0]);
  };
  const handleApi = () => {
    const formData = new FormData();
    formData.append("image", test);
    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, formData)
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="theheaderissodiff">
      <textarea
        placeholder={bio.Bio}
        onChange={(e) => handle(e)}
        value={userData.Bio}
        name="Bio"
        className="sizebio"
      ></textarea>
      <Button onClick={handlesubmit}>update bio</Button>
      <div>
        <Button onClick={() => logout()}>
          <Link to={"/login"}>Logout</Link>
        </Button>
        <form action="/action_page.php">
          <label for="img">Select image:</label>
          <input type="file" name="files" onChange={handleImage} />
          <button onClick={handleApi}>submit</button>
        </form>
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
