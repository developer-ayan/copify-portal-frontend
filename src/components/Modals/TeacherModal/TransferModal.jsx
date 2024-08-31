import React, { useState } from 'react';

const TransferModal = ({ isOpen, onClose }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  
  const [amount, setAmount] = React.useState('');

  const handleSubmit = () => {
   
    console.log('Selected Teacher:', selectedTeacher);
   
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
    <div className="bg-white px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
    <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">Transfer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="mb-4">
        
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a teacher</option>
            <option value="teacher1">Teacher 1</option>
            <option value="teacher2">Teacher 2</option>
            <option value="teacher3">Teacher 3</option>
          </select>
        </div>
        <div className="mt-2 w-full text-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>
        <div className="flex justify-center space-x-2 mt-3" >
          <button
            onClick={onClose}
            className="w-6/12 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center"
          >
            Submit
          </button>
          <button
            onClick={handleSubmit}
            className=" w-6/12 px-2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default TransferModal;