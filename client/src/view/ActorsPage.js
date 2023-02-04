import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './ActorsPage.css'
const ActorsPage = () => {
  const [actor, setActor] = useState([]);
  const FetchActor = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/actors");
    const test2 = await test1.json();
    setActor(test2);
  };
  useEffect(() => {
    FetchActor();
  }, []);
  return (
    <div className="actorcards">
      {actor.map((person) => {
        return (
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia sx={{ height: 300 }} image={person.picture} />
            <CardContent>
              <Typography>{`${person.name.first_name} ${person.name.last_name}`}</Typography>
              <Typography>{`${person.dob.date}`}</Typography>
              <Typography>{`${person.dob.location}`}</Typography>
              <Typography>{`${person.biography}`}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActorsPage;
