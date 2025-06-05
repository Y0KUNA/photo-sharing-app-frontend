import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import "./styles.css";
import TopBar from "../TopBar";

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString();
}

function UserPhotos({ User }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  console.log("UserPhotos userId: ", User._id);
  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      try {
        const res = await fetch(
          `https://383889-8080.csb.app/api/user/${userId}`
        );
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    }
    fetchUser();
  }, [userId]);

  // Lấy ảnh của user
  useEffect(() => {
    async function fetchPhotos() {
      if (!userId) return;
      try {
        const res = await fetch(
          `https://383889-8080.csb.app/api/photo/photosOfUser/${userId}`
        );
        if (res.ok) {
          const data = await res.json();
          setPhotos(data);
        }
      } catch (error) {
        console.error("Failed to fetch photos", error);
      }
    }
    fetchPhotos();
  }, [userId]);

  return (
    <div>
      <TopBar
        context={user ? `${user.last_name}'s photos` : "Photo"}
        user={User}
      />
      <h3>{user ? `${user.last_name}'s Photos` : "Photos"}</h3>
      {photos.length === 0 && <p>No photos found for this user.</p>}
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          {/* Đường dẫn ảnh nên trỏ đến đúng nguồn, sửa cho phù hợp */}
          <Link to={`/photo/${photo._id}`}>
            <img
              src={`https://383889-8080.csb.app/api/photo/image/${photo._id}`}
              alt={photo.file_name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>
          <p>Taken at: {formatDateTime(photo.date_time)}</p>
          {(photo.comments || []).map((comment) => (
            <div key={comment._id} style={{ paddingLeft: "10px" }}>
              <p>
                <b>
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  <span style={{ fontSize: "0.8em" }}>
                    {" "}
                    at {formatDateTime(comment.date_time)}
                  </span>
                </b>
                : {comment.comment}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
