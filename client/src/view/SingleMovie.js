import React, { useEffect, useState } from "react";
import "./SingleMovie.css";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const movieview = async () => {
    const test1 = await fetch(
      `http://127.0.0.1:8000/api/movies/${params.movieid}`
    );
    const test2 = await test1.json();
    setMovie(test2);
  };
  useEffect(() => {
    movieview();
  }, []);
  return (
    <div className="fixit">
      {movie.map((item) => (
        <h1>{item.name}</h1>
      ))}
    </div>
  );
};

export default SingleMovie;
