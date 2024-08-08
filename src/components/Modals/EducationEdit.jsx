import React, { useState } from 'react';

const EditInstituteModal = ({ show, onClose, onSave, currentInstitute }) => {
  const [name, setName] = useState(currentInstitute?.name || '');
  const [location, setLocation] = useState(currentInstitute?.location || '');

  const handleSave = () => {
    onSave(currentInstitute.name, name, location);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Edit Institute</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Institute Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex justify-center space-x-2">
        <button className="w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
 onClick={handleSave}>
            Save
          </button>
          <button className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75" onClick={onClose}>
            Cancel
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default EditInstituteModal;
