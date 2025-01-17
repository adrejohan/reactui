import React from "react";
import { Carousel } from "react-responsive-carousel";

const AnnotatedImageCarousel = ({
  annotatedImages,
  currentImageIndex,
  handleImageChange,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  dragOffset,
  scale,
}) => {
  return (
    <div className="annotated-carousel-wrapper">
      {annotatedImages.length > 0 ? (
        <Carousel
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          width="100%"
          dynamicHeight={true}
          centerMode={false}
          useKeyboardArrows={true}
          selectedItem={currentImageIndex}
          onChange={handleImageChange}
        >
          {annotatedImages.map((annotatedImage, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseUp}
              onDragStart={(e) => e.preventDefault()}
            >
              <img
                src={annotatedImage}
                alt={`Annotated Image ${index}`}
                style={{
                  transform: `scale(${scale}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AnnotatedImageCarousel;
