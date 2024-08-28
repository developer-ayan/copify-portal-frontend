import React, { useState } from 'react';

const AddPromoModal = ({ isOpen, closeModal, addDepartment, isLoading }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState('');

  console.log('startDate' , startDate)

  const handleAdd = () => {
    addDepartment(startDate, endDate, promoCode, discount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">Add Discount Promo Code</h3>
        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="relative w-full mb-4">
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md pr-10"
            placeholder="Discount"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            %
          </span>
        </div>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="Start Date"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="End Date"
        />

        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="Promo Code"
        />

        <div className="flex space-x-2 mt-2">
          <button
            className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? 'Load' : 'Add'}
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
  );
};

export default AddPromoModal;
