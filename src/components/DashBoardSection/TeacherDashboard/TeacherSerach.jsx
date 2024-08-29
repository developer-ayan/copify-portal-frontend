import React, { useState } from 'react';

const SearchSection = ({ selectedOption, setSelectedOption, onClose  }) => {
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Teacher Dashboard</h2>

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

        <label className="w-full sm:w-1/4 md:w-auto font-medium ml-0 sm:ml-4 mb-2 sm:mb-0 mr-2">Claim Code Number :</label>
        <input
          type="text"
          className="w-full sm:w-auto p-2 border border-gray-300 rounded mb-2 sm:mb-0" placeholder="CDK000001"

          onChange={(e) => setWalletBalance(e.target.value)}
        />
      </div>

      {/* <div className="flex flex-wrap items-center mb-4">
        <label className="w-full sm:w-1/4 font-medium mb-2 sm:mb-0">Claim Code Number:</label>
        <input
          type="text"
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded" placeholder="CDK000001"
          value={claimCode}
          onChange={(e) => setClaimCode(e.target.value)}
        />
      </div> */}

      <div className="mt-4 mb-4 flex justify-center">
        {radioButtons.map((item, index) => {
          return (
            <label className="mr-4" key={index}>
              <input
                type="radio"
                name="option"
                className="mr-2"
                value={item.value}
                checked={selectedOption === item.id}
                onChange={(e) => setSelectedOption(item.id)}
              />
              {item.value}
            </label>
          )
        })}

        {/* <label className="mr-4">
          <input
            type="radio"
            name="option"
            className="mr-2"
            value="Order Files"
            checked={selectedOption === 'Order Files'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Order Files
        </label> */}
        {/* <label>
          <input
            type="radio"
            name="option"
            className="mr-2"
            value="Personal Upload"
            checked={selectedOption === 'Personal Upload'}
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Personal Upload
        </label> */}
      </div>
    </div>
  );
};

export default SearchSection;

const radioButtons = [
  { value: "Calender Activity", id: 1 },
  { value: "Subscribe Students", id: 2 },
  { value: "Order Files Qty", id: 3 },
  { value: "Personal Upload", id: 4 }
  


]