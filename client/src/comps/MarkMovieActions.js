import React, { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import { UserDataContext, User_IdContext } from "../context/Passdata";
import { SERVER_URL } from "../constants/const";

const MarkMovieActions = ({ currentUser, Icon, item }) => {
  const { userid } = useContext(User_IdContext);
  const { userData, setUserData } = useContext(UserDataContext);

  const handleClick = async () => {
    if (userData.Watchlist.includes(item.name)) {
      return;
    }

    console.log(userData, item);
    let newdata = { ...userData };
    newdata.Watchlist.push(item.name);
    setUserData(newdata);
    console.log(newdata.Watchlist);
    axios
      .put(`${SERVER_URL}/api/users/${userid}`, {
        Watchlist: newdata.Watchlist,
      })
      .then((res) => console.log(res.data));
  };
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
