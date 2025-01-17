import React from "react";
import DetectionDetails from "./DetectionDetails/DetectionDetails";
import ImageCarousel from "./ImageCarousel/ImageCarousel";

const DetailsSection = ({
  name,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleGoEdit,
  handleSavePDFClick,
  handleExportCSVClick,
  labelCounts,
  currentImageIndex,
  handleLabelClick,
  selectedLabel,
  getLabelColor,
  totalImages,
  annotatedImages,
  handleImageChange,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  scale,
  dragOffset,
}) => {
  return (
    <div className="details-container">
      <DetectionDetails
        name={name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleGoEdit={handleGoEdit}
        handleSavePDFClick={handleSavePDFClick}
        handleExportCSVClick={handleExportCSVClick}
        labelCounts={labelCounts}
        currentImageIndex={currentImageIndex}
        handleLabelClick={handleLabelClick}
        selectedLabel={selectedLabel}
        getLabelColor={getLabelColor}
      />
      <ImageCarousel
        handleImageChange={handleImageChange}
        currentImageIndex={currentImageIndex}
        totalImages={totalImages}
        annotatedImages={annotatedImages}
        handleMouseDown={handleMouseDown}
        handleMouseMove={handleMouseMove}
        handleMouseUp={handleMouseUp}
        scale={scale}
        dragOffset={dragOffset}
      />
    </div>
  );
};

export default DetailsSection;
