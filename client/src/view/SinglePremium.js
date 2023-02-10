import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
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
  return (
    <div className="fixit">
      <div className="upanddown">
        <h1>{premium.name}</h1>
        <div className="sidetoside">
          <span>type: {premium.type}</span>
          <span>category: {premium.category}</span>
          <span>year: {premium.date}</span>
          <span>runtime: {premium.runtime} minutes</span>
        </div>
        <div className="sidetoside">
          <img width={220} height={321} src={premium.picture} alt="" />
          <span>{premium.description}</span>
        </div>
        <ReactPlayer url={premium.trailer} />
      </div>
    </div>
  );
};

export default SinglePremium;
