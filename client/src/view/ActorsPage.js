import React, { useEffect, useState } from "react";

const ActorsPage = () => {
  const [actor, setActor] = useState([]);
  const FetchActor = async () => {
    const test1 = await fetch("http://127.0.0.1:8000/api/actors");
    const test2 = await test1.json();
    setActor(test2);
    useEffect(() => {
      FetchActor();
    }, []);
  };
  return (
    <>
      {actor.map((person) => {
        return <h1>{`${person.name.first_name} ${person.name.last_name}`}</h1>;
      })}
    </>
  );
};


export default ActorsPage;
