// ImageControls.js
import React from "react";
import { IconButton } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

const ImageControls = ({ images, currentImageIndex, handleImageChange }) => {
  return (
    <div className="image-controls">
      <div className="carousel-arrows">
        {images.length > 1 && (
          <IconButton
            onClick={() =>
              handleImageChange(parseInt(currentImageIndex, 10) - 1)
            }
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <div className="image-counter">
          <span>
            {parseInt(currentImageIndex, 10) + 1}/{images.length}
          </span>
        </div>
        {images.length > 1 && (
          <IconButton
            onClick={() =>
              handleImageChange(parseInt(currentImageIndex, 10) + 1)
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ImageControls;
