import React, { useContext } from "react";
import { Box } from "@mui/system";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { Moviefetchcontext, Currentusercontext } from "../context/Passdata";
const Movietypefilter = ({ cat, setCat, ageofmovie }) => {
  const { bestofdabest, setBestofdabest } = useContext(Moviefetchcontext);
  const { currentUser, setCurrentUser } = useContext(Currentusercontext);

  const categories = bestofdabest
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  categories.unshift("All Movies");
  let agecategories = [];
  if (currentUser != false) {
    agecategories = ageofmovie
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index);
    agecategories.unshift("All Movies");
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
              {agecategories.map((i, index) => (
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

export default Movietypefilter;
