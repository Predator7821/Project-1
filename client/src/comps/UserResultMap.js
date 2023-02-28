import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UserResultMap = ({ e }) => {
  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
      <Link to={`/users/${e._id}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="500"
          image={e.pfp}
        />
      </Link>

      <CardContent className="makeitlookbetter">
        <Typography>{e.Username}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserResultMap;
