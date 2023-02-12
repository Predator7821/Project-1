import React, { useEffect, useState } from "react";
import "./Results.css";
const Results = () => {
  const show = "";
  const result = [];
  const filteredarr = result.filter((e) => e.name === show);
  const [actor, setActor] = useState([]);
  const [movie, setMovie] = useState([]);
  const [user, setUser] = useState([]);
  const getmovies = async () => {
    fetch("http://127.0.0.1:8000/api/movies")
      .then((response) => response.json())
      .then((data) => setActor(data));
  };
  const getactor = async () => {
    fetch("http://127.0.0.1:8000/api/actors")
      .then((response) => response.json())
      .then((data) => setMovie(data));
  };
  const getusers = async () => {
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  return (
    <div className="thatfuckingheader makeitfitthecenter">
      {filteredarr.map((e) => {
        return (
          <div>
            <h1>{e.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Results;
