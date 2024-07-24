import React, { useState } from 'react';

const MarkPaidModal = ({ isOpen, onClose }) => {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  // const [number, setNumber] = useState('');
  const [amount, setAmount] = React.useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Selected Teacher:', selectedTeacher);
    // console.log('Number:', number);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Transfer</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Select Teacher</label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>
        <div className="flex justify-end mt-3 sm:flex sm:justify-center" >
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            onClick={handleSubmit}
            className="  px-4 py-2 mt-3 w-full sm:w-auto sm:mx-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default MarkPaidModal;