import React, { useEffect, useState, useContext } from "react";
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  Button,
} from "@mui/material";
import "./Users.css";
import { Link } from "react-router-dom";
import { User_idcontext } from "../context/Passdata";
const Users = () => {
  const { userid, setUserid } = useContext(User_idcontext);
  const [users, setUsers] = useState([]);
  const Fetchuser = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/users");
    const test2 = await test1.json();
    setUsers(test2);
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
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://i.pinimg.com/736x/82/87/b8/8287b87f305d095b81c6da4957c896c0.jpg"
                  alt=""
                />
                <Button>
                  <Link to={`/users/${person._id}`}>More Info</Link>
                </Button>
                {setUserid(person._id)}
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
