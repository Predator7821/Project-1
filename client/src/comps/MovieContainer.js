import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";

import MarkMovieActions from "./MarkMovieActions";

const MovieContainer = ({ currentUser, item, actionFunc }) => {

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
          <MarkMovieActions
            item={item}
            currentUser={currentUser}
            Icon={StarBorderIcon}
            handleClick={actionFunc}
          />
        </Typography>
        <Typography>{item.name}</Typography>
        <Button>
          <a href={item.trailer}>Trailer</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieContainer;
