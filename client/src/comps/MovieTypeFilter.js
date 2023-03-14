import React, { useContext } from "react";
import { Box } from "@mui/system";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

import { MovieFetchContext, CurrentUserContext } from "../context/Passdata";

const MovieTypeFilter = ({ cat, setCat, ageOfMovie }) => {
  const { bestOfDaBest, setBestOfDaBest } = useContext(MovieFetchContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const categories = bestOfDaBest
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  categories.unshift("All Movies");
  let ageCategories = [];

  if (currentUser != false) {
    ageCategories = ageOfMovie
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);
      ageCategories.unshift("All Movies");
  }

  const handleSelect = (e) => {
    setCat(e.target.value);
  };
  return (
    <>
      {currentUser ? (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">categories:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              label="categories:"
              onChange={handleSelect}
            >
              {ageCategories.map((i, index) => (
                <MenuItem value={i} key={index}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">categories:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              label="categories:"
              onChange={handleSelect}
            >
              {categories.map((i, index) => (
                <MenuItem value={i} key={index}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
};

export default MovieTypeFilter;
