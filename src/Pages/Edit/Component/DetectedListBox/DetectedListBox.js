import React from "react";
import { Divider } from "@mui/material";
import HeaderWithMenu from "./Component/HeaderWithMenu";
import LabelCountTable from "./Component/LabelCountTable";
import bboxColor from "../../../../Utilities/BboxColor";

const DetectedListBox = ({
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
}) => {
  return (
    <div className="detectedlist-box">
      <HeaderWithMenu
        name={name}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleSave={handleSave}
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
      <LabelCountTable
        labelCounts={labelCounts}
        currentImageIndex={currentImageIndex}
        handleLabelClick={handleLabelClick}
        selectedLabel={selectedLabel}
        getLabelColor={getLabelColor}
        bboxColor={bboxColor}
      />
    </div>
  );
};

export default DetectedListBox;
