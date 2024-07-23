import React from 'react';

const WalletDashboard = () => {
  return (
    <div className="bg-white rounded p-6 mt-6 w-full sm:w-64">
      <h2 className="text-xl font-semibold mb-4">Wallet Dashboard</h2>
      <div className="mb-2 flex items-center">
        
        <label className="block font-semibold mr-2">Balance:</label>
        <input
          type="text"
          className="w-20 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value="815"
          readOnly
        />
      </div>
      <div className="mb-2 flex items-center">
        
        <label className="block font-semibold mr-2">Total Points:</label>
        <input
          type="text"
          className="w-20 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value="850"
          readOnly
        />
      </div>
      <div className="mb-2 flex items-center">
      <button className="px-2 py-2 bg-blue-500 text-white rounded-md">Recharge</button>
      
       
      </div>
      <div className="mb-2 flex items-center">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Transfer</button>
       
      </div>
      <div className="mb-2 flex items-center">
   
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md">Withdraw</button>

      </div>
      <div className="mb-2 flex items-center">
       
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md">Transaction History</button>

      </div>
    </div>
  );
};

export default WalletDashboard;
