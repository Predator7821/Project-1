import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SearchCatSelection = () => {
  const [cat, setCat] = useState("");

  const handleChange = (event) => {
    setCat(event.target.value);
  };

  return (
    <>
      <Select label="Filter:" onChange={handleChange} value={cat}>
        <MenuItem value={1}>All</MenuItem>
        <MenuItem value={2}>Actors</MenuItem>
        <MenuItem value={3}>Movies</MenuItem>
        <MenuItem value={4}>Users</MenuItem>
      </Select>
    </>
  );
};

export default SearchCatSelection;
