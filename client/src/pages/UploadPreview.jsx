import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadContext } from "../context/UploadContext";
import "./UploadPreview.css";

const UploadPreview = () => {
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const { addUpload } = useUploadContext();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!imageFile || !description.trim()) {
      alert("Please select an image and enter a description.");
      return;
    }
    addUpload({ image: imageFile, description });
    navigate("/profile");
  };

  return (
    <div className="upload-preview-container">
      <div className="upload-card">
        <h2>Upload Your Image</h2>
        {imageFile ? (
          <img src={imageFile} alt="preview" className="preview-img" />
        ) : (
          <div className="preview-placeholder">Image Preview</div>
        )}

        <label htmlFor="file-input" className="upload-label">
          Choose Image
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="upload-input"
        />

        <button className="upload-submit-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadPreview;
