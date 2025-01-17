import React from "react";
import { Divider } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import UserInfo from "./UserInfo";

const NavBar = ({ activeMenuItem, setActiveMenuItem, logoutHandler, name }) => {
  return (
    <div className="nav-box">
      <UserInfo name={name} />
      <Divider
        variant="middle"
        sx={{
          backgroundColor: "white",
          height: 2,
          width: "95%",
          margin: "0 auto",
        }}
      />
      <button
        className={`nav-button ${
          activeMenuItem === "dashboard" ? "active" : ""
        }`}
        onClick={() => setActiveMenuItem("dashboard")}
      >
        <DashboardIcon sx={{ fontSize: 40, marginRight: 2 }} />
        ダッシュボード
      </button>
      <div style={{ height: "40vh" }} />
      <button
        className={`nav-button ${activeMenuItem === "logout" ? "active" : ""}`}
        onClick={logoutHandler}
      >
        <LogoutIcon sx={{ fontSize: 40, marginRight: 2 }} />
        ログアウト
      </button>
    </div>
  );
};

export default NavBar;
