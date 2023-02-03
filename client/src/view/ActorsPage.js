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
          <div className="actorcards">
            <Card sx={{ maxWidth: 345, margin: 5 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={person.picture}
              />
              <CardContent>
                <Typography>{`${person.name.first_name} ${person.name.last_name}`}</Typography>
                <Typography>{`${person.dob.date}`}</Typography>
                <Typography>{`${person.dob.location}`}</Typography>
                <Typography>{`${person.biography}`}</Typography>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ActorsPage;
