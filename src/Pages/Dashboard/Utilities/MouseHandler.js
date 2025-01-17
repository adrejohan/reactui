import { useState } from "react";

const MouseHandlers = (uploadFiles, uploadedFiles, refreshUploadedFiles) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsHovering(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsHovering(false);

    const files = [...e.dataTransfer.files];
    uploadFiles(files, uploadedFiles, refreshUploadedFiles);
  };

  return {
    isDragging,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    handleDragOver,
    handleDrop,
  };
};

export default MouseHandlers;
