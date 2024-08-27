import React, { useState, useEffect } from 'react';
import { formatDateState } from '../../../utils/helper';

const EditPromoModal = ({ isOpen, closeModal, onSave, currentPromo, isLoading }) => {
  const [promoCode, setPromoCode] = useState(currentPromo.promo_code);
  const [startDate, setStartDate] = useState(formatDateState(currentPromo.start_date));
  const [endDate, setEndDate] = useState(formatDateState(currentPromo.end_date));
  const [discount, setDiscount] = useState(currentPromo.discount);


  const handleSave = () => {
    onSave(currentPromo.promoCode, promoCode, startDate, endDate, discount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Promo Code</h3>

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
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        <div className="flex space-x-2 mt-2">
          <button
            className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Load' : 'Save'}
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

export default EditPromoModal;
