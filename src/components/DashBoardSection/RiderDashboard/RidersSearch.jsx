import React, { useEffect, useState } from "react";
import { call } from "../../../utils/helper";
import toast from "react-hot-toast";
import SearchData from "../../SearchData/SearchData";
import { Loader } from "../../Loaders";

const SearchSection = ({
  disable,
  selectedOption,
  setSelectedOption,
  searchData,
  setSearchData,
  setSearchLoader,
  searchLoader,
  showSearchData,
  setShowSearchData,
  searchName,
  setSearchName,
  clearStates,
  item,
  setItem,
}) => {
  const [walletBalance, setWalletBalance] = useState("");

  const isEmpty = Object?.keys(item)?.length === 0;
  
  const handleSearch = async (value) => {
    try {

      value != "loader" && setSearchName(value);
      setShowSearchData(true);
      value == "loader" && setSearchLoader(true);
      const formData = new FormData();
      formData.append("search", searchName);
      const response = await call("/admin/search_rider", "POST", formData);
      setSearchData(response?.data);
      setSearchLoader(false);
    } catch (error) {
      setSearchData([]);
      setSearchLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const handleClearSearch = () => {
    setSearchName("");
    setShowSearchData(false);
    setItem({});
  };

  useEffect(() => {
    if (!searchName) {
      setShowSearchData(false);
      handleSearch("loader")
    }
  }, [searchName]);

  console.log("item?.claim_number", item);

  return searchLoader ? <Loader /> : (
    <div className="bg-white p-5 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Rider Dashboard
      </h2>

      <div className="flex flex-wrap items-center mb-4">
        <label className="w-full sm:w-1/4 md:w-auto font-medium ml-0 sm:ml-4 mb-2 sm:mb-0 mr-2">
          Search Name:
        </label>
        <div className="relative w-full sm:w-2/4 md:w-1/3 mb-2 sm:mb-0">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchName}
            onChange={(e) => handleSearch(e.target.value)}
            disabled={disable}
          />

          {searchName && !disable && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          )}
        </div>

        {!isEmpty ? (
          <>
            <label className="w-full sm:w-1/4 md:w-auto font-medium ml-0 sm:ml-4 mb-2 sm:mb-0 mr-2">
              Claim Code Number:
            </label>
            <input
              type="text"
              className="w-full sm:w-auto p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              placeholder="CDK000001"
              value={item?.claim_number}
              readOnly
            />
          </>
        ) : (
          <></>
        )}
        {/* <div className="flex flex-wrap items-center mb-4"> */}
      </div>

      {showSearchData ? (
        <SearchData
          handleSubmit={clearStates}
          data={searchData}
          keyword={"name"}
        />
      ) : (
        <></>
      )}

      {!isEmpty ? (
        <div className="flex justify-center flex-wrap">
          {radioButtons.map((item, index) => (
            <label className="mr-4 mb-2" key={index}>
              <input
                type="radio"
                name="option"
                className="mr-2"
                value={item.value}
                checked={selectedOption === item.id}
                onChange={() => setSelectedOption(item.id)}
              />
              {item.value}
            </label>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchSection;

// const radioButtons = [
//   { value: "Calender Activity", id: 1 },
//   { value: "Subscribe Students", id: 2 },
//   // { value: "Order Files Qty", id: 3 },
//   { value: "Personal Upload", id: 4 }
// ]

const radioButtons = [
  // { value: "Rider", id: 0 },
  { value: "All Orders", id: 1 },
  { value: "Pending Orders", id: 2 },
  { value: "In process Orders", id: 5 },
  { value: "Priting Orders", id: 3 },
  { value: "Ready to deliver", id: 6 },
  { value: "Completed Orders", id: 4 },
];
