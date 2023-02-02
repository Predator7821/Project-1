import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const SearchCatSelection = () => {
  const [cat, setCat] = useState("");

  const handleChange = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
      <Select value={cat} label="Filter:" onChange={handleChange}>
        <MenuItem>All</MenuItem>
        <MenuItem>Actors</MenuItem>
        <MenuItem>Movies</MenuItem>
        <MenuItem>Users</MenuItem>
      </Select>
    </>
  );
};

export default SearchCatSelection;
