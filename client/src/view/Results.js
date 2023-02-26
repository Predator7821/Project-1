import React, { useContext, useEffect, useState } from "react";
import { CardContent, Card, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

import { Catsearchcontext, Searchresultscontext } from "../context/Passdata";
import "./Results.css";

const Results = () => {
  const { results, setResults } = useContext(Searchresultscontext);
  const { searchCat, setSearchCat } = useContext(Catsearchcontext);

  let allmap = false;
  let moviemap = false;
  let actormap = false;
  let usermap = false;
  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [user, setUser] = useState([]);

  const getmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setMovie(data));
  };

  const getactor = async () => {
    fetch("http://127.0.0.1:8000/api/actors")
      .then((response) => response.json())
      .then((data) => setActor(data));
  };

  const getusers = async () => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  if (searchCat === "All") {
    getmovies();
    getactor();
    getusers();
    allmap = true;
  } else if (searchCat === "Actors") {
    getactor();
    actormap = true;
  } else if (searchCat === "Movies") {
    getmovies();
    moviemap = true;
  } else {
    getusers();
    usermap = true;
  }
  const allmovies = movie.filter(
    (e) => e.name.toLowerCase() === results.toLowerCase()
  );
  const allusers = user.filter(
    (e) => e.Username.toLowerCase() === results.toLowerCase()
  );
  const allactors = actor.filter(
    (e) => e.name.first_name.toLowerCase() === results.toLowerCase()
  );
  return (
    <div className="thatfuckingheader makeitfitthecenter organizedcards">
      {allmap ? (
        allmovies.map((e) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
              <Link to={`/movies/${e._id}`}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="500"
                  image={e.picture}
                />
              </Link>

              <CardContent className="makeitlookbetter">
                <Typography>{e.name}</Typography>
                <Typography>{e.category}</Typography>
                <Typography>{e.type}</Typography>
                <Typography>{e.date}</Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
      {allmap ? (
        allusers.map((e) => {
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
        })
      ) : (
        <div></div>
      )}
      {allmap ? (
        allactors.map((e) => {
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

              <CardContent className="makeitlookbetter">
                <Typography>
                  {e.name.first_name} {e.name.last_name}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
      {usermap ? (
        allusers.map((e) => {
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
        })
      ) : (
        <div></div>
      )}
      {moviemap ? (
        allmovies.map((e) => {
          return (
            <Card sx={{ minWidth: 345, maxWidth: 345, margin: 5 }}>
              <Link to={`/movies/${e._id}`}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="500"
                  image={e.picture}
                />
              </Link>

              <CardContent className="makeitlookbetter">
                <Typography>{e.name}</Typography>
                <Typography>{e.category}</Typography>
                <Typography>{e.type}</Typography>
                <Typography>{e.date}</Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
      {actormap ? (
        allactors.map((e) => {
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

              <CardContent className="makeitlookbetter">
                <Typography>
                  {e.name.first_name} {e.name.last_name}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Results;
