import React, { useContext } from "react";
import { Box } from "@mui/system";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Moviefetchcontext } from "../context/Passdata";
const Moviesortfilter = (setTypecat, typecat) => {
  const { bestofdabest, setBestofdabest } = useContext(Moviefetchcontext);
  const categories = bestofdabest
    .map((p) => p.type)
    .filter((value, index, array) => array.indexOf(value) === index);
  const handleSelect = (e) => {
    setTypecat(e.target.value);
  };
  categories.unshift("All types");
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">type:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typecat}
            label="type:"
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
    </>
  );
};

export default Moviesortfilter;
