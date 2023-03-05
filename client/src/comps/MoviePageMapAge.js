import React, { useContext } from "react";

import MovieContainer from "./MovieContainer";
const MoviePageMapAge = ({
  handlesubmit,
  currentUser,
  cat,
  setCat,
  Runtime,
  ageofmovie,
  setLength,
  Movietypefilter,
  bestmovie,
  length,
}) => {
  return (
    <>
      <div className="filtersorter">
        <Movietypefilter cat={cat} setCat={setCat} ageofmovie={ageofmovie} />
        <Runtime length={length} setLength={setLength} />
      </div>
      <div className="flexer">
        {bestmovie.map((item) => {
          return (
            <MovieContainer
              item={item}
              currentUser={currentUser}
              actionFunc={handlesubmit}
            />
          );
        })}
      </div>
    </>
  );
};

export default MoviePageMapAge;
