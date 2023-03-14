import React, { useEffect, useState } from "react";
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./Users.css";
import { SERVER_URL } from "../constants/const";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const FetchUser = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .finally(false);
  };

  useEffect(() => {
    setLoading(true);
    FetchUser();
    setLoading(false);
  }, []);

  return (
    <div className="theHeaderIsBroken">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <div className="cardFixer">
        {users.map((person) => {
          return (
            <div className="idkAnymore">
              <Card sx={{ minWidth: 250, maxWidth: 250, margin: 1 }}>
                <CardMedia sx={{ height: 140 }} image={person.pfp} alt="" />
                <Button>
                  <Link to={`/users/${person._id}`}>More Info</Link>
                </Button>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {person.Username}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
