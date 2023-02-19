import React from "react";
import { Box } from "@mui/system";
import { Slider } from "@mui/material";

function valuetext(value) {
  return `${value}$`;
}
const Runtime = ({ length, setLength }) => {
  const handleChange = (event, newValue) => {
    setLength(newValue);
  };
  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Runtime"}
          value={length}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          max="1000"
        />
      </Box>
    </>
  );
};

export default Runtime;
