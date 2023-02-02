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
    const test1 = await fetch(`http://127.0.0.1:8000/movies/${params.movieid}`);
    const test2 = await test1.json();
    setMovie(test2);
  };
  useEffect(() => {
    movieview();
  }, []);
  return (
    <div>
      {movie.map((item) => {
        return (
          <div className="upanddown">
            <h1>{item.name}</h1>
            <div className="sidetoside">
              <span>{item.type}</span>
              <span>{item.category}</span>
              <span>{item.date}</span>
              <span>{item.time}</span>
            </div>
            <div className="sidetoside">
              <img src={item.picture} alt="" />
              <span>{item.description}</span>
              <span>
                <StarIcon></StarIcon>
                {item.rating.rate}/10
                {item.rating.count}
                <Button>
                  <StarBorderIcon></StarBorderIcon>
                </Button>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleMovie;
