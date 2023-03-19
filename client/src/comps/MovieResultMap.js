import React, { useEffect } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MovieResultMap = ({ e }) => {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
      <Link to={`/movies/${e.name}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="500"
          image={e.picture}
        />
      </Link>

      <CardContent className="makeItLookBetter">
        <Typography>{e.name}</Typography>
        <Typography>{e.category}</Typography>
        <Typography>{e.type}</Typography>
        <Typography>{e.date}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieResultMap;
