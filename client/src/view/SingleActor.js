import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./SingleActor.css";

const SingleActor = () => {
  const params = useParams();
  const [actor, setActor] = useState({});

  const actorview = async () => {
    fetch(`http://127.0.0.1:8000/api/actors/${params.actorid}`)
      .then((response) => response.json())
      .then((data) => setActor(data));
  };

  useEffect(() => {
    actorview();
  }, []);

  return (
    <div className="icantsee namesofimages">
      <div className="beautifulname">
        <h1>{actor?.name?.first_name} </h1>
        <h1> {actor?.name?.last_name}</h1>
      </div>
      <div className="dropittotheside">
        <img width={400} height={225} src={actor.picture} alt="" />

        <span>{actor.biography}</span>
      </div>
    </div>
  );
};

export default SingleActor;
