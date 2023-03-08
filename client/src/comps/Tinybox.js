import React from "react";
import ReactPlayer from "react-player/youtube";

const Tinybox = ({ top, ranNum }) => {
  return (
    <div className="TinyBoxes">
      {top.length > 0 && <ReactPlayer url={top[ranNum].trailer} />}
      <div className="fromTheBotToTheTop">
        <h1>{top.length > 0 && top[ranNum].name}</h1>
        <span>{top.length > 0 && top[ranNum].description}</span>
      </div>
    </div>
  );
};

export default Tinybox;
