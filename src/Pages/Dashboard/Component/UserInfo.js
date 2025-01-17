import React from "react";
import { Face as FaceIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";

const UserInfo = ({ name }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <FaceIcon sx={{ fontSize: 90, marginRight: 2 }} />
      <div
        style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "1.5rem", fontFamily: "'Nunito', sans-serif" }}
        >
          こんにちは
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.5rem", fontFamily: "'Nunito', sans-serif" }}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
};

export default UserInfo;
