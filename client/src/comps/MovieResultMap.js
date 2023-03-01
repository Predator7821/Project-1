import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MovieResultMap = ({ e }) => {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
      <Link to={`/movies/${e._id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="500"
          image={e.picture}
        />
      </Link>

      <CardContent className="makeitlookbetter">
        <Typography>{e.name}</Typography>
        <Typography>{e.category}</Typography>
        <Typography>{e.type}</Typography>
        <Typography>{e.date}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieResultMap;
