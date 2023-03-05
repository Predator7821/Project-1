import React, { useContext, useEffect, useState } from "react";
import { User_idcontext } from "../context/Passdata";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

import {
  Logincontext,
  Currentusercontext,
  Checkpremiumcontext,
  Movieagecontext,
} from "../context/Passdata";
import "./Singleprofile.css";

const Singleprofile = () => {
  const { setIsLoggedIn } = useContext(Logincontext);
  const { setCurrentUser } = useContext(Currentusercontext);
  const { setIspremium } = useContext(Checkpremiumcontext);
  const { setMovieAge } = useContext(Movieagecontext);
  const { userid } = useContext(User_idcontext);
  const [imageSelected, setImageSelected] = useState("");
  const [bio, setBio] = useState([]);
  const [userData, setUserData] = useState({
    Bio: "",
  });
  let userpic = "";

  const handlesubmit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        Bio: userData.Bio,
      })
      .then((res) => {});
  };

  const fetchbio = async () => {
    fetch(`http://127.0.0.1:8000/api/users/${userid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBio(data);
      });
  };

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

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "mqzvcywi");
    await axios
      .post(`https://api.cloudinary.com/v1_1/dbuindglg/image/upload`, formData)
      .then((res) => {
        userpic = res.data.url;
      });

    await axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        pfp: userpic,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const deleteuser = async () => {
    await axios
      .delete(`http://127.0.0.1:8000/api/users/delete/${userid}`)
      .then((res) => {
        userpic = res.data.url;
      });
    setCurrentUser(false);
    setIsLoggedIn(false);
    setIspremium(false);
    setMovieAge(false);
  };
  const removie = (movieName) => {
    console.log(movieName);
    const clone = { ...bio };
    const index = clone.Watchlist.findIndex((mv) => mv === movieName);
    clone.Watchlist.splice(index, 1);

    axios
      .put(`http://127.0.0.1:8000/api/users/${userid}`, {
        Watchlist: clone.Watchlist,
      })
      .then((res) => {
        console.log(res);
        setBio(res.data);
      });
  };

  useEffect(() => {
    fetchbio();
  }, []);
  return (
    <div className="theheaderissodiff">
      <Image
        style={{ width: 100, height: 100 }}
        cloudName="dbuindglg"
        publicId={bio.pfp}
      />
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
        <input
          type="file"
          onChange={(event) => setImageSelected(event.target.files[0])}
        />
        <button onClick={uploadImage}>submit</button>
        <Button onClick={deleteuser}>
          <Link to={"/"}>Delete User</Link>
        </Button>
        {bio?.Watchlist?.map((e) => {
          console.log(e);
          return (
            <div>
              <h1>{e}</h1>
              <Button onClick={() => removie(e)}>Remove</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Singleprofile;
