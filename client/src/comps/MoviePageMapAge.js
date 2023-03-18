import React from "react";

import MovieContainer from "./MovieContainer";
const MoviePageMapAge = ({
  handleSubmit,
  currentUser,
  cat,
  setCat,
  Runtime,
  ageOfMovie,
  setLength,
  MovieTypeFilter,
  bestMovie,
  length,
}) => {
  return (
    <>
      <div className="filterSorter">
        <MovieTypeFilter cat={cat} setCat={setCat} ageOfMovie={ageOfMovie} />
        <Runtime length={length} setLength={setLength} />
      </div>
      <div className="flexer">
        {bestMovie.map((item) => {
          return (
            <MovieContainer
              item={item}
              currentUser={currentUser}
              actionFunc={handleSubmit}
            />
          );
        })}
      </div>
    </>
  );
};

export default MoviePageMapAge;
