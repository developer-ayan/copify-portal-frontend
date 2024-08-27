import React, { useState, useEffect } from 'react';

const EditPointModal = ({ isOpen, closeModal, onSave, currentPromo, isLoading }) => {
  const [points, setPoints] = useState('');
  const [php, setPhp] = useState('');

  useEffect(() => {
   
    if (currentPromo) {
      setPoints(currentPromo.points);
      setPhp(currentPromo.php);
    }
  }, [currentPromo]);

  const handleSave = () => {
 
    onSave(currentPromo.points, points, php);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg relative">
      
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={closeModal}
      >
        &times; 
      </button>
        <h3 className="text-xl font-semibold mb-4 text-center">Edit Points</h3>

        <div className="flex justify-center items-center space-x-4 mb-4">
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-5/12 px-3 py-2 border rounded-md text-center"
            placeholder="Points"
          />
          <p className="text-lg font-medium">into</p>
          <input
            type="text"
            value={php}
            onChange={(e) => setPhp(e.target.value)}
            className="w-5/12 px-3 py-2 border rounded-md text-center"
            placeholder="PHP"
          />
        </div>

        <div className="flex space-x-2 mt-2 justify-center">
          <button
            className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Save'}
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

export default EditPointModal;
