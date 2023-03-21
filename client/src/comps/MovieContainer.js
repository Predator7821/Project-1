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
import { AchiveThePremiumContext, UserDataContext } from "../context/Passdata";
import "./MovieContainer.css";
import { SERVER_URL } from "../constants/const";

const MovieContainer = ({ currentUser, item, isPremium }) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { premium, setPremium } = useContext(AchiveThePremiumContext);
  const [value, setValue] = useState();
  const [movieData, setMovieData] = useState([]);
  const [ratedMovie, setRatedMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingRating, setLoadingRating] = useState(true);
  const avrageMovieRating =
    (item.rating.rate / item.rating.count).toFixed(1) || 0;

  const sendRate = (newValue) => {
    setLoadingRating(false);
    setValue(newValue);
    if (currentUser !== false) {
      if (newValue >= 1 && newValue <= 5) {
        axios
          .put(
            isPremium
              ? `${SERVER_URL}/api/${userData._id}/premiums/${item._id}`
              : `${SERVER_URL}/api/${userData._id}/movies/${item._id}`,
            {
              rating: {
                rate: newValue + item.rating.rate,
                count: item.rating.count + 1,
              },
            }
          )
          .then((res) => {
            setUserData(res.data.user);
            console.log(res);
          })
          .catch((e) => console.log(e))
          .finally(() => setLoadingRating(true));
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${SERVER_URL}/api/movies/`,
    })
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
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
    <>
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <Card sx={{ minWidth: 345, maxWidth: 345, margin: 1 }}>
        <CardContent>
          <MarkMovieActions
            currentUser={currentUser}
            item={item}
            Icon={AddCircleIcon}
          />
        </CardContent>
        <Button>
          <Link
            to={isPremium ? `/premiums/${item.name}` : `/movies/${item.name}`}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="500"
              image={item.picture}
            />
          </Link>
        </Button>

        <CardContent>
          <Typography className="starsTonight">
            <StarIcon></StarIcon>
            {avrageMovieRating} ({item.rating.count})
          </Typography>
          <Typography>{item.name}</Typography>
          <Button>
            <a href={item.trailer}>Trailer</a>
          </Button>
        </CardContent>
        {loadingRating ? (
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
                sendRate(newValue);
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
    </>
  );
};

export default MovieContainer;
