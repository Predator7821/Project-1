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

const Users = () => {
  const [users, setUsers] = useState([]);

  const Fetchuser = async () => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    Fetchuser();
  }, []);

  return (
    <div className="theheaderisbroken">
      <div className="cardfixer">
        {users.map((person) => {
          return (
            <div className="idkanymore">
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
