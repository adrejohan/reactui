import React from "react";
import DetectedListBox from "./DetectedListBox/DetectedListBox";
import EditSection from "./EditSection/EditSection";
import { Prompt } from "react-router-dom";

const EditContainer = ({
  name,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleSave,
  labelCounts,
  currentImageIndex,
  handleLabelClick,
  selectedLabel,
  getLabelColor,
  images,
  handleImageChange,
  dragOffset,
  imageRef,
  canvasRef,
  scale,
  imageLoaded,
  setImageLoaded,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleSliderChange,
  annotationList,
  initialAnnotationList,
}) => {
  return (
    <div className="edit-container">
      <Prompt
        when={
          JSON.stringify(annotationList) !==
          JSON.stringify(initialAnnotationList)
        }
        message="行った変更が保存されない可能性があります？"
      />
      <DetectedListBox
        name={name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleSave={handleSave}
        labelCounts={labelCounts}
        currentImageIndex={currentImageIndex}
        handleLabelClick={handleLabelClick}
        selectedLabel={selectedLabel}
        getLabelColor={getLabelColor}
      />
      <EditSection
        images={images}
        currentImageIndex={currentImageIndex}
        handleImageChange={handleImageChange}
        dragOffset={dragOffset}
        imageRef={imageRef}
        canvasRef={canvasRef}
        scale={scale}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        selectedLabel={selectedLabel}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default EditContainer;
