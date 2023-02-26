import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./Err.css";

const Err = () => {
  const mistakeArr = [
    "oh no the page cannot be found",
    "it apeares the page can not be found i wonder why",
    "please let one of our lead devs know this page cant be found",
    "THE PAGE THE PAGE ITS NOT FOUND",
    "there should be a page here but there isnt try again",
    "i know you were looking for a page but it isnt here",
    "are you sure thats the page you were looking for ?",
  ];

  const ranNum = parseInt(Math.random() * mistakeArr.length);
  return (
    <div className="brokenheader">
      <div className="movesidetoside">
        <div className="oneabovetheother">
          <img
            src="https://cdn.discordapp.com/attachments/1027536882483085315/1073594609114042398/images.jpg"
            alt=""
            height={250}
            width={250}
          />
        </div>
        <h1> {mistakeArr[ranNum]}</h1>
        <Button>
          <Link to={`/`}>Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Err;
