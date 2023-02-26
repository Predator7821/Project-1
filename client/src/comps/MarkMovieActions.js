import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MarkMovieActions = ({ currentUser, item, Icon, handleClick }) => {
  return (
    <>
      {currentUser ? (
        <Button onClick={() => handleClick(item)}>
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
