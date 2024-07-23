import React from 'react';

const DetailsModal = ({ show, onClose, details }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">File Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="mb-4">
          <div className="flex mb-2">
            <strong>File Name:</strong>
            <span className="ml-2">{details.name}</span>
          </div>
          <div className="flex mb-2">
            <strong>Date Published:</strong>
            <span className="ml-2">{details.date}</span>
          </div>
          <div className="flex mb-2">
            <strong>Document Type:</strong>
            <span className="ml-2">{details.type}</span>
          </div>
          <div className="flex mb-2">
            <strong>Description:</strong>
            <span className="ml-2">{details.description}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
