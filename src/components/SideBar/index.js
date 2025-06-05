import React from "react";
import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://f4gvcl-8080.csb.app/api/user/admin/logout",
        {
          method: "GET",
          credentials: "include", // để gửi cookie session nếu có
        }
      );
      if (res.ok) {
        //setUser(null);
        sessionStorage.clear();

        navigate("/");
      }
      // Xóa thông tin người dùng sau khi logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // Hàm kiểm tra đăng nhập, nếu chưa thì chuyển về login
  const handleRequireLogin = (e, path) => {
    if (!user) {
      e.preventDefault(); // chặn link đi tiếp
      navigate("/login");
    } else {
      // Nếu có user thì đi tiếp
      navigate(path);
    }
  };

  return (
    <Stack spacing={2}>
      <Button
        variant="outlined"
        fullWidth
        onClick={(e) => handleRequireLogin(e, `/users/${user?._id}`)}
      >
        User info
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={(e) => handleRequireLogin(e, "/users")}
      >
        User list
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/photos/all")}
      >
        Photos
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={(e) => handleRequireLogin(e, "/upload")}
      >
        Upload photo
      </Button>

      {/* Ẩn nút Logout nếu chưa đăng nhập */}
      {user && (
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </Stack>
  );
}
