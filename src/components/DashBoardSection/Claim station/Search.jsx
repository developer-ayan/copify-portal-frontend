import React, { useState } from 'react';

const Search = ({ selectedOption, setSelectedOption }) => {
  const [searchName, setSearchName] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [claimCode, setClaimCode] = useState('');

  const handleSearch = () => {
    console.log('Search Name:', searchName);
    console.log('Wallet Balance:', walletBalance);
    console.log('Claim Code:', claimCode);
    console.log('Selected Option:', selectedOption);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Claim Station Dashboard</h2>

      <div className="flex flex-wrap items-center mb-4">
        <label className="w-full sm:w-1/4 md:w-1/6 font-medium mb-2 sm:mb-0">Search Name:</label>
        <input
          type="text"
          className="w-full sm:w-2/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button
          className="w-full sm:w-auto ml-0 sm:ml-2 p-2 bg-blue-500 text-white rounded mb-2 sm:mb-0"
          onClick={handleSearch}
        >
          Search
        </button>
        <label className="w-full sm:w-1/4 md:w-auto font-medium ml-0 sm:ml-4 mb-2 sm:mb-0 mr-2">Claim Code Number :</label>
        <input
          type="text"
          className="w-full sm:w-auto p-2 border border-gray-300 rounded mb-2 sm:mb-0" placeholder="CDK000001"

          onChange={(e) => setWalletBalance(e.target.value)}
        />
      </div>



      <div className="mt-4 mb-4 flex justify-center">
        

      </div>
    </div>
  );
};

export default Search;
