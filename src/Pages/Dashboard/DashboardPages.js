import "./DashboardStyles.css";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardContent,
  ButtonBase,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getUser, resetUserSession } from "../../Auth/AuthService";
import uploadFiles from "./Utilities/UploadFiles";
import fetchUploadedFiles from "./Utilities/FileListing";
import MouseHandlers from "./Utilities/MouseHandler";
import NavBar from "./Component/NavBar";
import FileTable from "./Component/FileTable";
import SearchBar from "./Component/SearchBar";

const Dashboard = (props) => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [latestUploadedFile, setLatestUploadedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const fileInputRef = useRef(null); // Ref for file input element

  const history = useHistory();
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";

  const refreshUploadedFiles = async () => {
    const files = await fetchUploadedFiles(user.userID);
    setUploadedFiles(files);
  };

  const {
    isDragging,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    handleDragOver,
    handleDrop,
  } = MouseHandlers(uploadFiles, uploadedFiles, refreshUploadedFiles);

  useEffect(() => {
    refreshUploadedFiles();
  }, [user.userID]);

  useEffect(() => {
    if (latestUploadedFile) {
      setUploadedFiles((prevFiles) => [...prevFiles, latestUploadedFile]);
      setLatestUploadedFile(null);
    }
  }, [latestUploadedFile, setUploadedFiles]);

  const handleTableRowClick = (file) => {
    history.push(`/file/${file.fileName}`, file);
  };

  const logoutHandler = () => {
    resetUserSession();
    props.history.push("/");
  };

  const handleCardClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
    handleClose(); // Close the menu
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      await uploadFiles(files, uploadedFiles, refreshUploadedFiles);
    }
  };

  return (
    <div className="dashboard-container">
      <NavBar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        logoutHandler={logoutHandler}
        name={name}
      />
      <section className="main-section">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="card-container">
          <ButtonBase onClick={handleCardClick}>
            <Card
              sx={{
                width: "15%",
                minWidth: 175,
                boxShadow: 5,
                borderRadius: 5,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon sx={{ fontSize: 48, color: "black" }} />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.5rem", color: "black", marginLeft: 1 }}
                  >
                    新規
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </ButtonBase>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleFileUploadClick}>
              ファイルのアップロード
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Autodesk Construction Cloudからファイルをインポート
            </MenuItem>
          </Menu>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
            accept="application/pdf"
          />
        </div>
        <FileTable
          uploadedFiles={uploadedFiles}
          searchTerm={searchTerm}
          handleTableRowClick={handleTableRowClick}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          isDragging={isDragging}
          isHovering={isHovering}
          refreshUploadedFiles={refreshUploadedFiles}
        />
      </section>
    </div>
  );
};

export default Dashboard;
