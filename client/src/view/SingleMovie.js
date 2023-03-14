import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import "./SingleMovie.css";
import SingleMovieMap from "../comps/SingleMovieMap";
import { SERVER_URL } from "../constants/const";

const SingleMovie = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const movieView = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/movies/${params.movieid}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .finally(setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    movieView();
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <SingleMovieMap x={movie} ReactPlayer={ReactPlayer} />
    </>
  );
};

export default SingleMovie;
