import React from "react";
import { Divider } from "@mui/material";
import DetectionHeader from "./Component/DetectionHeader";
import LabelCountsTable from "./Component/LabelCountsTable";

const DetectionDetails = ({
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
}) => {
  return (
    <div className="detectedlist-box">
      <DetectionHeader
        name={name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleGoEdit={handleGoEdit}
        handleSavePDFClick={handleSavePDFClick}
        handleExportCSVClick={handleExportCSVClick}
      />
      <Divider
        variant="middle"
        sx={{
          backgroundColor: "white",
          height: 2,
          width: "95%",
          margin: "0 auto",
        }}
      />
      <LabelCountsTable
        labelCounts={labelCounts}
        currentImageIndex={currentImageIndex}
        handleLabelClick={handleLabelClick}
        selectedLabel={selectedLabel}
        getLabelColor={getLabelColor}
      />
    </div>
  );
};

export default DetectionDetails;
