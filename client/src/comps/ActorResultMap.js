import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ActorResultMap = ({ e }) => {
  console.log(e);
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
      <Link to={`/actors/${e._id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="500"
          image={e.picture}
        />
      </Link>

      <CardContent className="makeItLookBetter">
        <Typography>{e.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ActorResultMap;
