import React from "react";

const SingleMovieMap = ({ x, ReactPlayer }) => {
  return (
    <div className="fixit">
      <div className="upanddown">
        <h1>{x.name}</h1>
        <div className="sidetoside">
          <span>type: {x.type}</span>
          <span>category: {x.category}</span>
          <span>year: {x.date}</span>
          <span>runtime: {x.runtime} minutes</span>
        </div>
        <div className="sidetoside">
          <img width={220} height={321} src={x.picture} alt="" />
          <span>{x.description}</span>
        </div>
        <ReactPlayer url={x.trailer} />
      </div>
    </div>
  );
};

export default SingleMovieMap;
