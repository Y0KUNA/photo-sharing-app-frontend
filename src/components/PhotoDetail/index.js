import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function formatDateTime(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString();
}

function PhotoDetail({ User }) {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  console.log("photoId: ", photoId);
  console.log("PhotoDetail User._Id: ", User._id);
  useEffect(() => {
    async function fetchPhoto() {
      console.log("Fetching for photoId: ", photoId);
      try {
        const res = await fetch(
          `https://f4gvcl-8080.csb.app/api/photo/${photoId}`
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setPhoto(data);
        console.log("Fetched data: ", data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch photo failed", err);
      }
    }
    fetchPhoto();
  }, [photoId]);
  useEffect(() => {
    console.log("Photo state updated:", photo);
  }, [photo]);
  const handleAddComment = async () => {
    console.log(
      "photoId:",
      photoId,
      "newComment:",
      newComment,
      "userID: ",
      User._id
    );
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setError("");
    try {
      const res = await fetch("https://f4gvcl-8080.csb.app/api/photo/comment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          photoId: photoId,
          user_id: User._id,
        }),
      });
      if (res.ok) {
        const addedComment = await res.json();
        setPhoto((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), addedComment],
        }));
        setNewComment("");
      } else if (res.status === 400) {
        setError("Comment cannot be empty");
      } else if (res.status === 401) {
        setError("Session error");
      } else {
        setError("unknown error");
      }
    } catch (err) {
      setError(err.message || "?");
    }
  };

  if (!photo) return <p>Loading photo...</p>;

  return (
    <div>
      <div>
        <img
          src={`https://f4gvcl-8080.csb.app/api/photo/image/${photo._id}`}
          alt={photoId}
          style={{ maxWidth: "100%", height: "auto" }}
        />

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

      <div style={{ marginTop: "20px" }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          placeholder="Add a comment"
          style={{ width: "100%", padding: "8px" }}
        />
        <button onClick={handleAddComment} style={{ marginTop: "8px" }}>
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default PhotoDetail;
