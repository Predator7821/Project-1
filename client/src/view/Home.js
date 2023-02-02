import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Home.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
const Home = () => {
  const MovieCycle = [
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
  ];
  const [top, setTop] = useState();
  const topmovies = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/movies");
    const test2 = await test1.json();
    setTop(test2);
  };
  useEffect(() => {
    topmovies();
  }, []);
  return (
    <div>
      <Box>
        <div className="topbotom">
          <img width={849} height={547.56} src={MovieCycle[0]} alt="" />
          <div className="sides">
            <div className="tinyboxes">
              <img width={88} height={130} src={MovieCycle[1]} alt="" />
              <div className="fromthebottothetop">
                <PlayCircleIcon></PlayCircleIcon>
                <span>movie title </span>
                <span>movie desc</span>
              </div>
            </div>
            <div className="tinyboxes">
              <img width={88} height={130} src={MovieCycle[1]} alt="" />
              <div className="fromthebottothetop">
                <PlayCircleIcon></PlayCircleIcon>
                <span>movie title </span>
                <span>movie desc</span>
              </div>
            </div>
            <div className="tinyboxes">
              <img width={88} height={130} src={MovieCycle[1]} alt="" />
              <div className="fromthebottothetop">
                <PlayCircleIcon></PlayCircleIcon>
                <span>movie title </span>
                <span>movie desc</span>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Home;
