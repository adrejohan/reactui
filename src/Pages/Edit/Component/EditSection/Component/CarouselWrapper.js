// CarouselWrapper.js
import React from "react";

const CarouselWrapper = ({
  currentImageIndex,
  dragOffset,
  imageRef,
  canvasRef,
  images,
  scale,
  setImageLoaded,
  selectedLabel,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}) => {
  return (
    <div className="carousel-wrapper">
      <div
        key={currentImageIndex}
        style={{
          position: "relative",
          left: dragOffset.x,
          top: dragOffset.y,
        }}
      >
        <img
          ref={imageRef}
          src={images[currentImageIndex]}
          alt={`image-${currentImageIndex}`}
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${scale})`,
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <canvas
          ref={canvasRef}
          width={imageRef.current ? imageRef.current.clientWidth : 0}
          height={imageRef.current ? imageRef.current.clientHeight : 0}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: selectedLabel ? "crosshair" : "grab",
            transform: `scale(${scale})`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default CarouselWrapper;
