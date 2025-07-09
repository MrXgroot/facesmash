import React from "react";
import UploadPreview from "./pages/UploadPreview";
import Profile from "./components/profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<UploadPreview />} />
    </Routes>
  );
}

export default App;
