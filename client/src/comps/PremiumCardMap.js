import React, { useContext } from "react";

import MovieContainer from "./MovieContainer";

const PremiumCardMap = ({ item, currentUser, handleSubmit }) => {
  return (
    <MovieContainer
      item={item}
      currentUser={currentUser}
      handleSubmit={handleSubmit}
      isPremium
    />
  );
};

export default PremiumCardMap;
