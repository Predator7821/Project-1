import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import "./SingleMovie.css";
import SingleMovieMap from "../comps/SingleMovieMap";

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});

  const movieview = async () => {
    fetch(`http://127.0.0.1:8000/api/movies/${params.movieid}`)
      .then((response) => response.json())
      .then((data) => setMovie(data));
  };

  useEffect(() => {
    movieview();
  }, []);

  return <SingleMovieMap x={movie} ReactPlayer={ReactPlayer} />;
};

export default SingleMovie;
