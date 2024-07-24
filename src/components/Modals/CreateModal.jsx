import React from 'react';

const Modal = ({ isOpen, onClose, onRecharge }) => {
  const [amount, setAmount] = React.useState('');

  const handleRecharge = () => {
    onRecharge(amount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-center sm:justify-center sm:flex-col">
          <h1 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Withdraw
          </h1>
          <div className="mt-2 w-full text-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">
          <button
            type="button"
            className="w-full sm:w-auto sm:mx-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleRecharge}
          >
            Submit
          </button>
          <button
            type="button"
            className="mt-3 w-full sm:w-auto sm:mx-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
