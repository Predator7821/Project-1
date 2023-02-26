import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./ActorsPage.css";

const ActorsPage = () => {
  const [actor, setActor] = useState([]);

  const FetchActor = async () => {
    fetch("http://127.0.0.1:8000/api/actors")
      .then((response) => response.json())
      .then((data) => setActor(data));
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
            <Button>
              <Link to={`/actors/${person._id}`}>More Info</Link>
            </Button>
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
