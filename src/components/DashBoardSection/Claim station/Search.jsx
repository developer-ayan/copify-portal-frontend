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
      const response = await call("/admin/search_student_and_teacher", "POST", formData);
      console.log("response =>", response?.data);
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



  console.log("item?.claim_number", item)

  return searchLoader ? <Loader /> : (
    <div className="bg-white p-5 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Student Dashboard
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

    
    </div>
  );
};

export default SearchSection;