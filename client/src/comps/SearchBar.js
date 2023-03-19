import React, { useContext } from "react";
import { TextField } from "@mui/material";

import { SearchResultsContext } from "../context/Passdata";
import "./SearchBar.css";
const SearchBar = () => {
  const { results, setResults } = useContext(SearchResultsContext);

  return (
    <>
      <TextField
        className="beWhitePlz"
        color="info"
        onBlur={(e) => setResults(e.target.value)}
        name="search"
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </>
  );
};

export default SearchBar;
