import React from "react";

import "./SingleMovieMap.css";

const SingleMovieMap = ({ x, ReactPlayer }) => {
  return (
    <div className="fixIt">
      <div className="upAndDown">
        <h1>{x.name}</h1>
        <div className="sideToSide">
          <h2> type: {x.type} </h2>
          <h1>/</h1>
          <h2> category: {x.category} </h2>
          <h1>/</h1>
          <h2> year: {x.date} </h2>
          <h1>/</h1>
          <h2> runtime: {x.runtime} minutes </h2>
        </div>
        <div className="sideToSide">
          <img width={220} height={321} src={x.picture} alt="" />
          <span>{x.description}</span>
        </div>
        <ReactPlayer url={x.trailer} />
      </div>
    </div>
  );
};

export default SingleMovieMap;
