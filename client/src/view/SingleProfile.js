import React, { useContext, useEffect, useState, useMemo } from "react";
import { AchiveThePremiumContext, User_IdContext } from "../context/Passdata";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import {
  LoginContext,
  CurrentUserContext,
  CheckPremiumContext,
  MovieAgeContext,
} from "../context/Passdata";
import "./SingleProfile.css";
import { SERVER_URL } from "../constants/const";

const SingleProfile = () => {
  const { setIsLoggedIn } = useContext(LoginContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { setIsPremium } = useContext(CheckPremiumContext);
  const { setMovieAge } = useContext(MovieAgeContext);
  const { userId, setUserId } = useContext(User_IdContext);
  const { premium, setPremium } = useContext(AchiveThePremiumContext);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState("");
  const [bio, setBio] = useState([]);
  const [userData, setUserData] = useState({
    Bio: "",
  });
  let userpic = "";

  const listOfPremiumsNames = useMemo(
    () => premium?.map((p) => p.name),
    [premium]
  );
  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(`${SERVER_URL}/api/users/${userId}`, {
        Bio: userData.Bio,
      })
      .then((res) => {})
      .finally(setLoading(false));
  };

  const fetchBio = async (id) => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBio(data);
      })
      .finally(setLoading(false));
  };

  const handle = (e) => {
    const newdata = { ...userData };
    newdata[e.target.name] = e.target.value;
    setUserData(newdata);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
    setCurrentUser(false);
    setMovieAge(false);
    setUserId(false);
    localStorage.clear();
  };

  const fetchPremium = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/premiums`)
      .then((response) => response.json())
      .then((data) => setPremium(data))
      .finally(setLoading(false));
  };
  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "mqzvcywi");
    await axios
      .post(`https://api.cloudinary.com/v1_1/dbuindglg/image/upload`, formData)
      .then((res) => {
        userpic = res.data.url;
      })
      .finally(setLoading(false));
    setLoading(true);
    await axios
      .put(`${SERVER_URL}/api/users/${userId}`, {
        pfp: userpic,
      })
      .then((res) => {
        console.log(res);
      })
      .finally(setLoading(false));
  };
  const deleteUser = async () => {
    setLoading(true);
    await axios
      .delete(`${SERVER_URL}/api/users/delete/${userId}`)
      .then((res) => {
        userpic = res.data.url;
      })
      .finally(setLoading(false));
    setCurrentUser(false);
    setIsLoggedIn(false);
    setIsPremium(false);
    setMovieAge(false);
    localStorage.removeItem("auth");
  };
  const removie = (movieName) => {
    setLoading(true);
    console.log(movieName);
    const clone = { ...bio };
    const index = clone.Watchlist.findIndex((mv) => mv === movieName);
    clone.Watchlist.splice(index, 1);

    axios
      .put(`${SERVER_URL}/api/users/${userId}`, {
        Watchlist: clone.Watchlist,
      })
      .then((res) => {
        console.log(res);
        setBio(res.data);
        localStorage.setItem("USER_DATA_STORAGE", JSON.stringify(res.data));
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("USER_ID_STORAGE"));
    fetchBio(id);
    if (premium.length === 0) {
      fetchPremium();
    }
    setUserId(id);
  }, []);
  return (
    <div className="theHeaderIsSoDiff">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
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
        className="sizeBio"
      ></textarea>
      <Button variant="outlined" onClick={handleSubmit}>
        update bio
      </Button>
      <div className="fixMyBio">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onChange={(event) => setImageSelected(event.target.files[0])}
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Button variant="outlined" onClick={uploadImage}>
          Upload the selected image
        </Button>

        {bio?.Watchlist?.map((e) => {
          console.log(e);
          return (
            <div className="dosomthingelse">
              <Link
                to={
                  listOfPremiumsNames.includes(e)
                    ? `/premiums/${e}`
                    : `/movies/${e}`
                }
              >
                <h1>{e}</h1>
              </Link>
              <Button variant="outlined" onClick={() => removie(e)}>
                Remove
              </Button>
            </div>
          );
        })}
        <Button onClick={() => logout()}>
          <Link to={"/"}>Logout</Link>
        </Button>
        <Button sx={{ bgcolor: "red" }} color="warning" onClick={deleteUser}>
          <Link to={"/"}>Delete User</Link>
        </Button>
      </div>
    </div>
  );
};

export default SingleProfile;
