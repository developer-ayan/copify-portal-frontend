// Modal.js
import React from 'react';

const ShopDeleteModal = ({ delete_name, closeModal, confirmModal, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        <div className="flex flex-col items-center mb-4">
          <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-2">
            <span className="text-3xl">!</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Confirm</h3>
        </div>
        <p className="text-center mb-6">Are you sure you want to delete {delete_name}?</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
          <button
            className={`bg-red-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            onClick={confirmModal}
          >
            {isLoading ? 'Load' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDeleteModal;
