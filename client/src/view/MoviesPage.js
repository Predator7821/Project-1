import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./MoviePage.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
const MoviesPage = () => {
  const [movie, setMovie] = useState([]);
  const FetchMovie = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/movies");
    const test2 = await test1.json();
    setMovie(test2);
  };
  useEffect(() => {
    FetchMovie();
  }, []);
  return (
    <div className="spacer flexer">
      {movie.map((item) => {
        return (
          <Card sx={{ maxWidth: 345 }}>
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
  );
};

export default MoviesPage;
