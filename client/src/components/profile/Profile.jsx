import React from "react";
import "./Profile.css";
import { useUploadContext } from "../../context/UploadContext";
import { useNavigate } from "react-router-dom";
import model1 from "../../assets/model1.jpg";
import model2 from "../../assets/model2.jpg";
import model3 from "../../assets/model3.jpg";
import model4 from "../../assets/model4.jpg";
import model5 from "../../assets/model5.jpg";

const mockUser = {
  name: "Azmal",
  email: "azmal@example.com",
  photo: "https://i.pravatar.cc/150?img=12",
  uploads: [model1, model2, model3, model4, model5],
};

const Profile = () => {
  const navigate = useNavigate();
  const { uploads } = useUploadContext();

  const allUploads = [...uploads, ...mockUser.uploads];
  const hasMedal = allUploads.length >= 3;

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-grid">
          <img
            src={mockUser.photo}
            alt={mockUser.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2 className="profile-name">
              {mockUser.name}
              {hasMedal && <span className="profile-medal">🏅</span>}
            </h2>
            <p className="profile-email">{mockUser.email}</p>
          </div>
        </div>
      </div>

      {/* Uploads Section */}
      <div className="uploads-section">
        <h3 className="uploads-title">Your Uploads</h3>
        <div className="uploads-grid">
          {allUploads.map((upload, idx) => (
            <div key={idx} className="upload-card">
              <img
                src={upload.image || upload}
                alt={`upload-${idx}`}
                className="upload-full-img"
              />
              <p className="upload-desc">
                {upload.description || `This is a dummy description #${idx + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <div className="fixed-upload-btn">
        <button
          className="upload-btn yellow-btn"
          onClick={() => navigate("/upload")}
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
};

export default Profile;
