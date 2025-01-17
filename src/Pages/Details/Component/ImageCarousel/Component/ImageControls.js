import React from "react";
import { IconButton } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const ImageControls = ({
  currentImageIndex,
  totalImages,
  handleImageChange,
}) => {
  return (
    <div className="image-controls">
      <div className="carousel-arrows">
        {totalImages > 1 && (
          <IconButton onClick={() => handleImageChange(currentImageIndex - 1)}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <div className="image-counter">
          <span>
            {currentImageIndex + 1}/{totalImages}
          </span>
        </div>
        {totalImages > 1 && (
          <IconButton onClick={() => handleImageChange(currentImageIndex + 1)}>
            <ArrowForwardIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ImageControls;
