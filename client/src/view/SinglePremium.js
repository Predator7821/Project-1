import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import SingleMovieMap from "../comps/SingleMovieMap";
import { SERVER_URL } from "../constants/const";

const SinglePremium = () => {
  const [premium, setPremium] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const fetchPremium = async () => {
    setLoading(true);
    fetch(`${SERVER_URL}/api/premiums/${params.premiumsid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPremium(data);
      })
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
