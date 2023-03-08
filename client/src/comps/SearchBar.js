import React, { useContext } from "react";
import { TextField } from "@mui/material";

import { SearchResultsContext } from "../context/Passdata";

const SearchBar = () => {
  const { results, setResults } = useContext(SearchResultsContext);

  return (
    <>
      <TextField
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
