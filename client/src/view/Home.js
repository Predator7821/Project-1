import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Home.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Home = () => {
  const MovieCycle = [
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
    "https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg",
  ];
  const [top, setTop] = useState([]);
  const topmovies = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/movies");
    const test2 = await test1.json();
    setTop(test2);
  };
  useEffect(() => {
    topmovies();
  }, []);
  const [actor, setActor] = useState([]);
  const bdayactor = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/movies");
    const test2 = await test1.json();
    setActor(test2);
  };
  useEffect(() => {
    bdayactor();
  }, []);

  const toparr = top.filter((i) => i.rating.rate >= 9);
  const ratearr = top.filter((i) => i.rating.count >= 750000);

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const bdayarr = actor.filter((i) => i.dob.date === date);
  return (
    <div className="enlarge">
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
      <h1>Top Rated Movies</h1>
      <div className="pop">
        {toparr.map((item) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 5 }}>
              <CardContent>
                <Button>
                  <AddCircleIcon></AddCircleIcon>
                </Button>
              </CardContent>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.picture}
              />
              <CardContent>
                <Typography>
                  <StarIcon></StarIcon>
                  {item.rating.rate}
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography>
                  <Button>
                    <StarBorderIcon></StarBorderIcon>
                  </Button>
                </Typography>
                <Button>watch later</Button>
                <Button>trailer</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <h1>Fan Choice</h1>
      <div className="pop">
        {ratearr.map((item) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 5 }}>
              <CardContent>
                <Button>
                  <AddCircleIcon></AddCircleIcon>
                </Button>
              </CardContent>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={item.picture}
              />
              <CardContent>
                <Typography>
                  <StarIcon></StarIcon>
                  {item.rating.rate}
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography>
                  <Button>
                    <StarBorderIcon></StarBorderIcon>
                  </Button>
                </Typography>
                <Button>watch later</Button>
                <Button>trailer</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <h1>todays birthdays</h1>
      <div className="pop">
        {bdayarr.map((item) => {
          return (
            <div>
              <img
                width={50}
                height={50}
                className="smallpfp"
                src={item.picture}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
