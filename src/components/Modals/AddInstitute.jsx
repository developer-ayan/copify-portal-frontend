import React, { useState } from "react";
import UploadFile from "../UploadFile/UploadFile";

const UploadModal = ({ show, onClose, onSave, isLoading }) => {
  const [instituteName, setInstituteName] = useState("");
  const [location, setLocation] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");

  const handleSave = () => {
    if ((instituteName && location, file, code)) {
      onSave(instituteName, location, file, code);
    } else {
      alert("Please provide both institute name, location, code and image");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Institute
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
          <UploadFile
            fileName={fileName}
            setFileName={setFileName}
            file={file}
            setFile={setFile}
          />
          <div className="mb-2">
            <input
              id="instituteName"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Institute Name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              id="institute_code"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Institute Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              id="location"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex justify-center space-x-2">
            <button
              className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Load" : "Save"}
            </button>
            <button
              onClick={onClose}
              className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
