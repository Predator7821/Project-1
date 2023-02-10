import React, { useEffect, useState } from "react";
import "./Home.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactPlayer from "react-player/youtube";
import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Home = () => {
  const [top, setTop] = useState([]);
  const topmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setTop(data));
  };
  useEffect(() => {
    topmovies();
  }, []);
  const ranNum = parseInt(Math.random() * top.length + 1);
  // const [actor, setActor] = useState([]);
  // const bdayactor = async () => {
  //   const test1 = await fetch("http://127.0.0.1:8000/api/actors");
  //   const test2 = await test1.json();
  //   setActor(test2);
  // };
  // useEffect(() => {
  //   bdayactor();
  // }, []);

  const toparr = top.filter((i) => i.rating.rate >= 9);
  const ratearr = top.filter((i) => i.rating.count >= 750000);

  // const current = new Date();
  // const date = `${current.getDate()}/${
  //   current.getMonth() + 1
  // }/${current.getFullYear()}`;
  // const bdayarr = actor.filter((i) => i.dob.date === date);

  return (
    <div className="enlarge">
      <h1>Top Rated Movies</h1>
      <div className="pop">
        {toparr.map((item) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
              <CardContent>
                <Button>
                  <AddCircleIcon></AddCircleIcon>
                </Button>
              </CardContent>
              <Button>
                <Link to={`/movies/${item._id}`}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="500"
                    image={item.picture}
                  />
                </Link>
              </Button>

              <CardContent>
                <Typography>
                  <StarIcon></StarIcon>
                  {item.rating.rate}
                  <Button>
                    <StarBorderIcon></StarBorderIcon>
                  </Button>
                </Typography>
                <Typography>{item.name}</Typography>
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
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
              <CardContent>
                <Button>
                  <AddCircleIcon></AddCircleIcon>
                </Button>
              </CardContent>
              <Button>
                <Link to={`/movies/${item._id}`}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="500"
                    image={item.picture}
                  />
                </Link>
              </Button>
              <CardContent>
                <Typography>
                  <StarIcon></StarIcon>
                  {item.rating.rate}
                  <Button>
                    <StarBorderIcon></StarBorderIcon>
                  </Button>
                </Typography>
                <Typography>{item.name}</Typography>
                <Button>watch later</Button>
                <Button>trailer</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* <h1>todays birthdays</h1>
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
      </div> */}
    </div>
  );
};

export default Home;
