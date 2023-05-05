import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto", width: "100%" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;