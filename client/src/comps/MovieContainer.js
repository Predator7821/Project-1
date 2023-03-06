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

import MarkMovieActions from "./MarkMovieActions";
import axios from "axios";

const MovieContainer = ({ currentUser, item }) => {
  const [value, setValue] = useState();
  const [movieData,setMovieData]=useState([])
  const getrating= async()=>{
    fetch(`http://127.0.0.1:8000/api/movies/`)
  .then((response) => response.json())
  .then((data) => setMovieData(data));

  }
  const [rate,setRate]=useState({
    Rate:"",
    count:"",
  })
  const sendrate = (newValue,item) => {
    setValue(newValue);
    if (currentUser != false) {
      if (value === null) {
        axios.put(`http://127.0.0.1:8000/api/movies/${item._id}`,{
          Rate: 5,
          count: 1,
        }).then((res)=>{console.log(res)})
      }
    }
  };
  useEffect(()=>{
    getrating()
  },[])
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
          {item.rating.rate.toFixed(1)}
        </Typography>
        <Typography>{item.name}</Typography>
        <Button>
          <a href={item.trailer}>Trailer</a>
        </Button>
      </CardContent>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue,item) => {
          sendrate(newValue,item);
        }}
      />
    </Card>
  );
};

export default MovieContainer;
