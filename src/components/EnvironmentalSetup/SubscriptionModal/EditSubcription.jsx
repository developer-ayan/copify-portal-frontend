import React, { useState, useEffect } from 'react';

const EditSubscriptionModal = ({ isOpen, closeModal, onSave, currentSubscription, isLoading }) => {
  const [plan, setPlan] = useState('');
  const [php, setPhp] = useState('');
  const [months, setMonths] = useState('');

 
  useEffect(() => {
    if (currentSubscription) {
      setPlan(currentSubscription.plan);
      setPhp(currentSubscription.php);
      setMonths(currentSubscription.months);
    }
  }, [currentSubscription]);

  const handleSave = () => {
    if (plan && php && months) {
      onSave(currentSubscription.plan, plan, php, months); 
    }
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

        <h3 className="text-xl font-semibold mb-4">Edit Subscription</h3>

        <input
          type="number"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="1"
          required
        />

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
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
          

        </select>

        <div className="flex space-x-2 mt-2">
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
