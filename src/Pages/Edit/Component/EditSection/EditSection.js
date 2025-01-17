import React from "react";
import ImageControls from "./Component/ImageControls";
import CarouselWrapper from "./Component/CarouselWrapper";
import ZoomSlider from "./Component/ZoomSlider";

const EditSection = ({
  images,
  currentImageIndex,
  handleImageChange,
  dragOffset,
  imageRef,
  canvasRef,
  scale,
  imageLoaded,
  setImageLoaded,
  selectedLabel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleSliderChange,
}) => {
  return (
    <section className="edit-section">
      <ImageControls
        images={images}
        currentImageIndex={currentImageIndex}
        handleImageChange={handleImageChange}
      />

      <CarouselWrapper
        currentImageIndex={currentImageIndex}
        dragOffset={dragOffset}
        imageRef={imageRef}
        canvasRef={canvasRef}
        images={images}
        scale={scale}
        setImageLoaded={setImageLoaded}
        selectedLabel={selectedLabel}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
      />

      <ZoomSlider scale={scale} handleSliderChange={handleSliderChange} />
    </section>
  );
};

export default EditSection;
