import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

import "./ActorsPage.css";
import { SERVER_URL } from "../constants/const";

const ActorsPage = () => {
  const [actor, setActor] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${SERVER_URL}/api/actors`,
    })
      .then((res) => {
        console.log(res.data);
        setActor(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="actorCards">
      {loading && (
        <div className="loading">
          <img
            className="loading"
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
            alt=""
          />
        </div>
      )}
      {actor.map((person) => {
        return (
          <Card sx={{ margin: 1, maxWidth: 400 }}>
            <CardMedia sx={{ height: 600 }} image={person.picture} />
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
