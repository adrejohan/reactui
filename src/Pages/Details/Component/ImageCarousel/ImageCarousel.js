import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ImageControls from "./Component/ImageControls";
import AnnotatedImageCarousel from "./Component/AnnotatedImageCarousel";
import ZoomSlider from "./Component/ZoomSlider";

const ImageCarousel = ({
  handleImageChange,
  currentImageIndex,
  totalImages,
  annotatedImages,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  scale,
  dragOffset,
}) => {
  return (
    <section className="details-section">
      <ImageControls
        currentImageIndex={currentImageIndex}
        totalImages={totalImages}
        handleImageChange={handleImageChange}
      />
      <AnnotatedImageCarousel
        annotatedImages={annotatedImages}
        currentImageIndex={currentImageIndex}
        handleImageChange={handleImageChange}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        dragOffset={dragOffset}
        scale={scale}
      />
      <ZoomSlider scale={scale} />
    </section>
  );
};

export default ImageCarousel;
