import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const Lang = () => {
const [lang,setLang]=useState('')

const handleChange = (event) => {
  setLang(event.target.value);
};


  return (
    <>
      <Select  label="Languge:" onChange={handleChange} value={lang}>
        <MenuItem value={1}>EN</MenuItem>
        <MenuItem value={2}>RU</MenuItem>
        <MenuItem value={3}>HE</MenuItem>
      </Select>
    </>
  );
};

export default Lang;
