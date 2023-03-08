import React, { useContext } from "react";
import { MenuItem, Select } from "@mui/material";

import { CatSearchContext } from "../context/Passdata";

const SearchCatSelection = () => {
  const { searchCat, setSearchCat } = useContext(CatSearchContext);

  const handleChange = (event) => {
    setSearchCat(event.target.value);
  };

  return (
    <>
      <Select label="Filter:" onChange={handleChange} value={searchCat}>
        <MenuItem value={"Actors"}>Actors</MenuItem>
        <MenuItem value={"Movies"}>Movies</MenuItem>
        <MenuItem value={"Users"}>Users</MenuItem>
      </Select>
    </>
  );
};

export default SearchCatSelection;
