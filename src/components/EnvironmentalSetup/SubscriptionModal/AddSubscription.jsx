import React, { useState } from 'react';

const AddSubscriptionModal = ({ isOpen, closeModal, addDepartment, isLoading }) => {
 
  const [php, setPhp] = useState('');
  const [months, setMonths] = useState('');
  const handleAdd = () => {
    if (php && months) {
      addDepartment(php, months); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Add Subscription</h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="mb-2">
            
           

          
            <input
              type="text"
              value={php}
              onChange={(e) => setPhp(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="PHP"
              required
            />

           
            <select
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
              required
            >
              <option value="" disabled>
                Select Months
              </option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>

            <div className="flex space-x-2 mt-2">
              <button
                className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                onClick={handleAdd}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Add'}
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
      </div>
    </div>
  );
};

export default AddSubscriptionModal;
