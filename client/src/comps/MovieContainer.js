import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import axios from "axios";

import MarkMovieActions from "./MarkMovieActions";
import { UserDataContext } from "../context/Passdata";
import "./MovieContainer.css";

const MovieContainer = ({ currentUser, item }) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [value, setValue] = useState();
  const [movieData, setMovieData] = useState([]);
  const [ratedMovie, setRatedMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const avrageMovieRating = item.rating.rate / item.rating.count || 0;
  const getrating = async () => {
    fetch(`http://127.0.0.1:8000/api/movies/`)
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  };

  const sendrate = (newValue) => {
    setLoading(false);
    setValue(newValue);
    if (currentUser !== false) {
      if (newValue >= 1 && newValue <= 5) {
        axios
          .put(`http://127.0.0.1:8000/api/${userData._id}/movies/${item._id}`, {
            rating: {
              rate: newValue + item.rating.rate,
              count: item.rating.count + 1,
            },
          })
          .then((res) => {
            setUserData(res.data.user);
            console.log(res);
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(true));
      }
    }
  };
  useEffect(() => {
    getrating();
  }, []);

  useEffect(() => {
    if (currentUser !== false) {
      if (userData) {
        const ratedMovieExsists = userData?.MovieRating?.filter(
          (mv) => mv.Movieid === item._id
        );
        if (ratedMovieExsists?.length > 0) {
          setRatedMovie(ratedMovieExsists[0]);
        }
      }
    }
  }, [userData]);

  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
      <CardContent>
        <MarkMovieActions
          currentUser={currentUser}
          item={item}
          Icon={AddCircleIcon}
        />
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
        <Typography className="starstonight">
          <StarIcon></StarIcon>
          {avrageMovieRating} ({item.rating.count})
        </Typography>
        <Typography>{item.name}</Typography>
        <Button>
          <a href={item.trailer}>Trailer</a>
        </Button>
      </CardContent>
      {loading ? (
        <>
          <Rating
            name="simple-controlled"
            value={value || ratedMovie.rate}
            onChange={(event, newValue) => {
              console.log(userData);
              const wasMovieRated = userData?.MovieRating.findIndex(
                (mv) => mv.Movieid === item._id
              );
              console.log(wasMovieRated, item._id);
              if (wasMovieRated > -1) {
                return;
              }
              sendrate(newValue);
            }}
          />
        </>
      ) : (
        <div>
          <img
            width={50}
            height={50}
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
            alt=""
          />
        </div>
      )}
    </Card>
  );
};

export default MovieContainer;
