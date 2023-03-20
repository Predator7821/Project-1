import React, { useContext, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import { UserDataContext, User_IdContext } from "../context/Passdata";
import { SERVER_URL } from "../constants/const";

const MarkMovieActions = ({ currentUser, Icon, item }) => {
  const { userId, setUserId } = useContext(User_IdContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const handleClick = async () => {
    console.log(userData);
    if (userData.Watchlist.includes(item.name)) {
      return;
    }

    console.log(userData, item);
    let newdata = { ...userData };
    newdata.Watchlist.push(item.name);
    setUserData(newdata);
    console.log(newdata.Watchlist);
    axios
      .put(`${SERVER_URL}/api/users/${userId}`, {
        Watchlist: newdata.Watchlist,
      })
      .then((res) => console.log(res.data));
  };

  const getUserInfo = async () => {
    const userInfo = await axios.get(`${SERVER_URL}/api/users/${userId}`);
    if (Object.keys(userInfo.data).length > 0) {
      setUserData(userInfo.data);
    } else {
      setUserData(userInfo.data[0]);
      //maybe you will need to delete the [0] - not sure"
    }
  };
  useEffect(() => {
    if (!userId) {
      const userIdFromStorage = JSON.parse(
        localStorage.getItem("USER_ID_STORAGE")
      );
      setUserId(userIdFromStorage);
    }
    const usedat = JSON.parse(localStorage.getItem("USER_DATA_STORAGE"));
    setUserData(usedat);
  }, []);

  useEffect(() => {
    if (userData && Object.keys(userData).length === 0 && userId) {
      getUserInfo();
    }
  }, [userId]);
  return (
    <>
      {currentUser ? (
        <Button onClick={handleClick}>
          <Icon></Icon>
        </Button>
      ) : (
        <Button>
          <Link to={"/login"}>
            <Icon></Icon>
          </Link>
        </Button>
      )}
    </>
  );
};

export default MarkMovieActions;
