import React from "react";
import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DetectionHeader = ({
  name,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleGoEdit,
  handleSavePDFClick,
  handleExportCSVClick,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.5rem",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {name}
      </Typography>
      <IconButton
        aria-label="menu"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ marginLeft: "auto" }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleGoEdit}>認識結果を編集する</MenuItem>
        <MenuItem onClick={handleSavePDFClick}>pdfファイルで書き出す</MenuItem>
        <MenuItem onClick={handleExportCSVClick}>
          csvファイルで書き出す
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DetectionHeader;
