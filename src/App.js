import "./App.css";

import { React, useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login/Login";
import Photos from "./components/Photos";
import PhotoDetail from "./components/PhotoDetail";
import Register from "./components/Register";
import UploadPhoto from "./components/UploadPhoto.js";
const App = (props) => {
  const [user, setUser] = useState();
  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://383889-8080.csb.app/api/user/admin/logout",
        {
          method: "GET",
          credentials: "include", // để gửi cookie session nếu có
        }
      );
      if (res.ok) {
        setUser(null);
        sessionStorage.clear();
        console.log(user.username);
        navigate("/");
      }
      // Xóa thông tin người dùng sau khi logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              context={user ? "Users list" : "Please login"}
              user={user}
              onLogout={handleLogout}
            />
          </Grid>

          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {<SideBar user={user} onLogout={handleLogout} />}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Photos />} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail User={user} />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos User={user} />}
                />
                <Route
                  path="/photo/:photoId"
                  element={<PhotoDetail User={user} />}
                />
                <Route path="/photos/all" element={<Photos />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload" element={<UploadPhoto User={user} />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
