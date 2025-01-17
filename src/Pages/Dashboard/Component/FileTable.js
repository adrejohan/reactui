import React, { useState } from "react";
import { Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import Swal from "sweetalert2";

const FileTable = ({
  uploadedFiles,
  searchTerm,
  handleTableRowClick,
  handleDragOver,
  handleDrop,
  handleMouseEnter,
  handleMouseLeave,
  isDragging,
  isHovering,
  refreshUploadedFiles,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const deleteAPIUrl = "DELETE API URL HERE";

  const requestConfig = {
    headers: {
      "x-api-key": "API KEY HERE",
    },
  };

  const handleMenuClick = (event, file) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedFile(file);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    setSelectedFile(null);
  };

  const handleMenuItemClick = async (event, action) => {
    event.stopPropagation();
    handleMenuClose(event);

    const result = await Swal.fire({
      title: "ファイルを削除しますか?",
      text: "この操作は取り消せません。",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "はい",
      cancelButtonText: "いいえ",
    });

    if (result.isConfirmed) {
      try {
        const deleteResponse = await axios.post(
          deleteAPIUrl,
          selectedFile,
          requestConfig
        );
        Swal.fire({
          title: "削除されました!",
          text: "ファイルが削除されました。",
          icon: "success",
          timer: 3000, // 3 seconds timer
          timerProgressBar: true,
          showConfirmButton: false,
        });
        refreshUploadedFiles();
      } catch (error) {
        Swal.fire({
          title: "エラー",
          text: "ファイルの削除に失敗しました。",
          icon: "error",
          timer: 3000, // 3 seconds timer
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div
      className="table-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ファイル名</th>
              <th>最終更新</th>
              <th>ステータス</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.length === 0 && !(isDragging && isHovering) ? (
              <tr className="no-data-text">
                <td colSpan="4">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "28px",
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    ファイルが見つかりません。
                  </Typography>
                </td>
              </tr>
            ) : (
              uploadedFiles
                .filter((file) =>
                  file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((file, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      if (file.status === "認識完了") {
                        handleTableRowClick(file);
                      }
                    }}
                    style={{
                      cursor:
                        file.status === "認識完了" ? "pointer" : "default",
                      pointerEvents:
                        file.status === "認識完了" ? "auto" : "none",
                    }}
                  >
                    <td>{file.fileName}</td>
                    <td>{file.uploadDateTime}</td>
                    <td>{file.status}</td>
                    <td>
                      <IconButton
                        onClick={(event) => handleMenuClick(event, file)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedFile === file}
                        onClose={handleMenuClose}
                      >
                        <MenuItem
                          onClick={(event) =>
                            handleMenuItemClick(event, "Action 1")
                          }
                        >
                          削除
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      {isDragging && isHovering && (
        <div className="drop-zone">
          <span className="drop-zone-text">
            ファイルをドロップしてください。
          </span>
        </div>
      )}
    </div>
  );
};

export default FileTable;
