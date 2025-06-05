import React, { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const dt = new Date(dateStr);
  return dt.toLocaleString(); // hoặc tùy chỉnh định dạng
}

function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchModel(
        "https://383889-8080.csb.app/api/photo/list",
        { credentials: "include" }
      );
      setPhotos(result || []);
    }
    fetchData();
  }, []);

  return (
    <>
      {photos.length === 0 && <p>No photos available.</p>}
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: "20px" }}>
          {/* Chỉnh lại đường dẫn ảnh nếu cần */}
          <Link to={`/photo/${photo._id}`}>
            <img
              src={`https://383889-8080.csb.app/api/photo/image/${photo._id}`}
              alt={photo.file_name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Link>
          <p>{photo._id}</p>
          <p>Taken at: {formatDateTime(photo.date_time)}</p>

          {(photo.comments || []).map((comment) => (
            <div key={comment._id} style={{ paddingLeft: "10px" }}>
              <p>
                <b>
                  {comment.user ? (
                    <Link to={`/users/${comment.user._id}`}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                  ) : (
                    "Unknown User"
                  )}
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
    </>
  );
}

export default Photos;
