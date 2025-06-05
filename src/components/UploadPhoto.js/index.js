// src/components/UploadPhoto.js
import React, { useState } from "react";

function UploadPhoto({ User, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("user_id", User._id);

    setUploading(true);

    try {
      const res = await fetch("https://383889-8080.csb.app/api/photo/upload", {
        method: "POST",
        body: formData,
        credentials: "include", // Gửi cookie session nếu cần
      });

      if (res.ok) {
        const result = await res.json();
        setSelectedFile(null);
        if (onUploadSuccess) onUploadSuccess(result); // Callback
        alert("Upload successful!");
      } else {
        const errText = await res.text();
        setError(`Upload failed: ${errText}`);
      }
    } catch (err) {
      setError("Upload error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ marginLeft: 8 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UploadPhoto;
