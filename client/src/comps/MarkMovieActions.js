import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import { User_idcontext } from "../context/Passdata";

const MarkMovieActions = ({ currentUser, Icon,item }) => {
  const { userid } = useContext(User_idcontext);
  const [userData, setUserData] = useState({
    Watchlist: [],
  });

  const handleClick = async() =>{
    let newdata = { ...userData };
    newdata= item.name;
    setUserData(newdata);
    axios
    .put(`http://127.0.0.1:8000/api/users/${userid}`, {
      Watchlist: userData
    })
    .then((res) => {});
  }
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
