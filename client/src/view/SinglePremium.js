import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import SingleMovieMap from "../comps/SingleMovieMap";
import { AchiveThePremiumContext } from "../context/Passdata";

const SinglePremium = () => {
  const { premium, setPremium } = useContext(AchiveThePremiumContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchPremium = async () => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/premiums/${params.premiumsid}`)
      .then((response) => response.json())
      .then((data) => setPremium(data))
      .finally(setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchPremium();
    setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmVlNWQ3ODMzMjBiOGYwYjAxYjAwYzY1MGQ4NTE0ODJmZGQ5YjQ0YSZjdD1n/2oLtN5SdHX6J4cm9d1/giphy.gif"
          alt=""
        />
      )}
      <SingleMovieMap x={premium} ReactPlayer={ReactPlayer} />
    </>
  );
};

export default SinglePremium;
