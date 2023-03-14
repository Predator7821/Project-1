import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SingleActor.css";
import { SERVER_URL } from "../constants/const";

const SingleActor = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [actor, setActor] = useState({});

  const actorView = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/actors/${params.actorid}`)
      .then((response) => response.json())
      .then((data) => setActor(data))
      .finally(setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    actorView();
    setLoading(false);
  }, []);

  return (
    <div className="iCantSee namesOfImages">
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <div className="beautifulName">
        <h1>{actor?.name?.first_name} </h1>
        <h1> {actor?.name?.last_name}</h1>
      </div>
      <div className="dropItToTheSide">
        <img width={400} height={225} src={actor.picture} alt="" />

        <span>{actor.biography}</span>
      </div>
    </div>
  );
};

export default SingleActor;
