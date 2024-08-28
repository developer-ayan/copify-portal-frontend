import React, { useState } from 'react';

const DeliveryAdd = ({ show, onClose, onSave, isLoading }) => {
  const [radiusName, setRadiusName] = useState('');

  const handleSave = () => {
    if (radiusName) {
      onSave(radiusName); 
      setRadiusName(''); 
    } else {
      alert('Please enter a radius.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setRadiusName(value);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Add Delivery Charges</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="mb-2">
            <input
              type="number"
              id="number-input"
              value={radiusName}
              onChange={handleInputChange} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1" required 
             
            />
          </div>

          <div className="flex justify-center space-x-2">
            <button
              className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Load' : 'Add'}
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

export default DeliveryAdd;
