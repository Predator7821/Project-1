import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import "./SingleMovie.css";

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

  return (
    <div className="fixit">
      <div className="upanddown">
        <h1>{movie.name}</h1>
        <div className="sidetoside">
          <span>type: {movie.type}</span>
          <span>category: {movie.category}</span>
          <span>year: {movie.date}</span>
          <span>runtime: {movie.runtime} minutes</span>
        </div>
        <div className="sidetoside">
          <img width={220} height={321} src={movie.picture} alt="" />
          <span>{movie.description}</span>
        </div>
        <ReactPlayer url={movie.trailer} />
      </div>
    </div>
  );
};

export default SingleMovie;
