import React, { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);

  // Function to add a new upload
  const addUpload = (newUpload) => {
    setUploads((prev) => [newUpload, ...prev]);
  };

  return (
    <UploadContext.Provider value={{ uploads, addUpload }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};
