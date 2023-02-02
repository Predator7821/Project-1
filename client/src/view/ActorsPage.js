import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const ActorsPage = () => {
  const [actor, setActor] = useState([]);
  const FetchActor = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/actors");
    const test2 = await test1.json();
    setActor(test2);
    console.log(actor);
  };
  useEffect(() => {
    FetchActor();
  }, []);
  return (
    <>
      {actor.map((person) => {
        return (
          <Card sx={{ display: `flex` }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography>{`${person.name.first_name} ${person.name.last_name}`}</Typography>
                <Typography>{`${person.dob.date}`}</Typography>
                <Typography>{`${person.dob.location}`}</Typography>
                <Typography>{`${person.biography}`}</Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={person.image}
              alt=""
            />
          </Card>
        );
      })}
    </>
  );
};

export default ActorsPage;
