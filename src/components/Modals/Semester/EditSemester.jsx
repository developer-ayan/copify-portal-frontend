
import React, { useState, useEffect } from 'react';

const EditSemesterModal = ({ isOpen, closeModal, editSemester, isLoading, currentSemester }) => {
  const [semesterName, setSemesterName] = useState('');

 
  useEffect(() => {
    if (currentSemester) {
      setSemesterName(currentSemester.semester_name);
    }
  }, [currentSemester]);

  const handleSave = () => {
    if (semesterName.trim() !== '') {
      editSemester(semesterName); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Edit Semester</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <input
          type="text"
          value={semesterName}
          onChange={(e) => setSemesterName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="Semester Name"
        />
        <div className="flex space-x-2 mt-2">
          <button
            className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSemesterModal;
