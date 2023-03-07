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

const MovieContainer = ({ currentUser, item }) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [value, setValue] = useState();
  const [movieData, setMovieData] = useState([]);
  const [ratedMovie, setRatedMovie] = useState({});
  const getrating = async () => {
    fetch(`http://127.0.0.1:8000/api/movies/`)
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  };

  const sendrate = (newValue) => {
    setValue(newValue);
    if (currentUser !== false) {
      if (newValue >= 1 && newValue <= 5) {
        axios
          .put(`http://127.0.0.1:8000/api/${userData._id}/movies/${item._id}`, {
            rating: {
              rate: newValue,
              count: item.rating.count++,
            },
          })
          .then((res) => {
            setUserData(res);
            console.log(res);
          });
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
        <Typography>
          <StarIcon></StarIcon>
          {item.rating.rate}
        </Typography>
        <Typography>{item.name}</Typography>
        <Button>
          <a href={item.trailer}>Trailer</a>
        </Button>
      </CardContent>
      <Rating
        name="simple-controlled"
        value={value || ratedMovie.rate}
        onChange={(event, newValue) => {
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
    </Card>
  );
};

export default MovieContainer;
