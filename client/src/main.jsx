import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UploadProvider } from "./context/UploadContext"; // ✅ Import the provider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UploadProvider> {/* Wrap App */}
        <App />
      </UploadProvider>
    </BrowserRouter>
  </React.StrictMode>
);
