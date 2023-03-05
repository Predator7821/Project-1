import React, { useContext } from "react";
import MovieContainer from "./MovieContainer";

const PremiumCardMap = ({ item, currentUser, handlesubmit }) => {
  return (
    <MovieContainer
      item={item}
      currentUser={currentUser}
      handlesubmit={handlesubmit}
    />
  );
};

export default PremiumCardMap;
