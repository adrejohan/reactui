import "./DetailsStyle.css";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DetailsSection from "./Component/DetectionSection";
import { getUser } from "../../Auth/AuthService";
import useFetchData from "../../Utilities/useFetchDataImages";
import bboxColor from "../../Utilities/BboxColor";
import countLabels from "../../Utilities/HandleCountLabel";
import useMouseFunctions from "./Utilities/MouseHandler";
import handleSaveAsPDF from "./Utilities/HandleSaveAsPDF";
import { handleExportToCSV } from "./Utilities/HandleGenerateCSV";
import loadAnnotatedImages from "./Utilities/HandleLoadImages";

const FileDetail = () => {
  const { name } = useParams();
  const history = useHistory();
  const user = getUser();
  const userID = user.userID;

  const { annotationList, images } = useFetchData(userID, name);

  const getLabelColor = (label) => bboxColor[label] || "red";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [annotatedImages, setAnnotatedImages] = useState([]);
  const [labelCounts, setLabelCounts] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(null);

  const { handleMouseDown, handleMouseMove, handleMouseUp, dragOffset, scale } =
    useMouseFunctions(1);

  useEffect(() => {
    countLabels(annotationList, setLabelCounts);
  }, [annotationList, setLabelCounts]);

  useEffect(() => {
    loadAnnotatedImages(
      images,
      annotationList,
      selectedLabel,
      setAnnotatedImages
    );
  }, [images, annotationList, selectedLabel]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    setSelectedLabel(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSavePDFClick = () => {
    handleSaveAsPDF(annotatedImages, name);
  };

  const handleExportCSVClick = () => {
    handleExportToCSV(images, labelCounts, name);
  };

  const handleLabelClick = (label) => {
    setSelectedLabel(label === selectedLabel ? null : label);
  };

  const handleGoEdit = () => {
    history.push(`/edit/${name}/page/${currentImageIndex}`, {
      state: { currentImageIndex, initialAnnotationList: annotationList },
    });
  };

  return (
    <div className="details-container">
      <DetailsSection
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
        handleImageChange={handleImageChange}
        totalImages={images.length}
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

export default FileDetail;
