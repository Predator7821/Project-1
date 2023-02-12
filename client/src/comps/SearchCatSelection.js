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
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Actors"}>Actors</MenuItem>
        <MenuItem value={"Movies"}>Movies</MenuItem>
        <MenuItem value={"Users"}>Users</MenuItem>
      </Select>
    </>
  );
};

export default SearchCatSelection;
