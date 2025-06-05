import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ context, user, onLogout }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* BÊN TRÁI */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!user ? (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Typography variant="h6" color="inherit">
                {user.username}
              </Typography>
            </>
          )}
        </Box>

        {/* BÊN PHẢI */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {context && (
            <Typography variant="h6" color="inherit">
              {context}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
