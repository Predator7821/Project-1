import React, { useContext, useState } from "react";
import { MenuItem, Select } from "@mui/material";

import { Catsearchcontext } from "../context/Passdata";

const SearchCatSelection = () => {
  const { searchCat, setSearchCat } = useContext(Catsearchcontext);

  const handleChange = (event) => {
    setSearchCat(event.target.value);
    console.log(searchCat);
  };

  return (
    <>
      <Select label="Filter:" onChange={handleChange} value={searchCat}>
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Actors"}>Actors</MenuItem>
        <MenuItem value={"Movies"}>Movies</MenuItem>
        <MenuItem value={"Users"}>Users</MenuItem>
      </Select>
    </>
  );
};

export default SearchCatSelection;
