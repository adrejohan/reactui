import React from "react";
import { Typography, Slider } from "@mui/material";

const ZoomSlider = ({ scale }) => {
  return (
    <div
      className="zoom-slider"
      style={{
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        width: "25%",
      }}
    >
      <Typography variant="body1" style={{ fontSize: "1rem" }}>
        ズーム :
      </Typography>
      <Slider
        value={scale}
        min={0.5}
        max={5}
        step={0.1}
        aria-labelledby="zoom-slider"
        sx={{ flexGrow: 1 }}
      />
      <Typography variant="body1" style={{ marginLeft: "0.5rem" }}>
        {`${Math.round(scale * 100)}%`}
      </Typography>
    </div>
  );
};

export default ZoomSlider;
