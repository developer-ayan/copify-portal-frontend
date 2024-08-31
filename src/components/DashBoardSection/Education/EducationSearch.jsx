import React, { useState } from 'react';

const Search = ({ selectedOption, setSelectedOption, searchMethod , isLoading }) => {
  const [searchName, setSearchName] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [claimCode, setClaimCode] = useState('');

  const handleSearch = () => {
    console.log('Search Name:', searchName);
    console.log('Wallet Balance:', walletBalance);
    console.log('Claim Code:', claimCode);
    console.log('Selected Option:', selectedOption);
  };

  const handleClearSearch = () => {
    setSearchName(''); 
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-center mb-4 ">Educational Institute</h2>

      <div className="flex flex-wrap items-center mb-4">
        <label className="w-full sm:w-1/4 md:w-auto font-medium ml-0 sm:ml-4 mb-2 sm:mb-0 mr-2">Search Name:</label>
        <div className="relative w-full sm:w-2/4 md:w-1/3 mb-2 sm:mb-0">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          {searchName && (
            <button 
              onClick={handleClearSearch} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          )}
        </div>
        <button
          className="w-full sm:w-auto ml-0 sm:ml-2 p-2 bg-blue-500 text-white rounded mb-2 sm:mb-0"
          onClick={handleSearch}
        >
          Search
        </button> 

     
      </div>
    </div>
  );
};

export default Search;
