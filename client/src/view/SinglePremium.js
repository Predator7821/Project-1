import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import SingleMovieMap from "../comps/SingleMovieMap";

const SinglePremium = () => {
  const [premium, setPremium] = useState([]);
  const params = useParams();

  const fetchpremium = async () => {
    fetch(`http://127.0.0.1:8000/api/premiums/${params.premiumsid}`)
      .then((response) => response.json())
      .then((data) => setPremium(data));
  };

  useEffect(() => {
    fetchpremium();
  }, []);

  return <SingleMovieMap x={premium} ReactPlayer={ReactPlayer} />;
};

export default SinglePremium;
