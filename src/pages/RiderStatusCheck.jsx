import React, { useContext, useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import SearchSection from "../components/DashBoardSection/RiderDashboard/RidersSearch";
import { AppContext } from "../context";
import RiderStatus from "../components/DashBoardSection/RiderDashboard/RiderStatus";

const RiderStatusCheck = () => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const [disable, setDisable] = useState(false);
  const [item, setItem] = useState({});

  // const fetchAnalytics = async () => {
  //   setIsLoading(true);
  //   const url = base_url + "/super-admin-dashboard";

  //   try {
  //     const res = await fetch(url);
  //     const json = await res.json();

  //     if (json.success) {
  //       const data = json.success.data;
  //       console.log("data", data);
  //       setIsLoading(false);
  //       setAnalytics(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Page
      title="Collegio de Kidapawan Branch"
      containerStyles={`relative !bg-[#EEF2F5] !p-0`}
      headerStyles="px-5 !m-0 !py-2 bg-white"
      enableHeader
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {isLoading ? (
            <div className="w-full flex justify-center items-center min-h-[90vh]">
              <Loader extraStyles="!static !bg-transparent" />
            </div>
          ) : (
            <main className="p-8">
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
                  );
                })}
              </div>
              {/* <SearchSection
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setSearchData={setSearchData}
                searchData={searchData}
                setSearchLoader={setSearchLoader}
                searchLoader={searchLoader}
                setShowSearchData={setShowSearchData}
                showSearchData={showSearchData}
                setSearchName={setSearchName}
                searchName={searchName}
                clearStates={clearStates}
                item={item}
                setItem={setItem}
                disable={disable}
              /> */}
              <RiderStatus
                selectedOption={selectedOption}
                disable={disable}
                item={item}
              />
              {/* 
const radioButtons = [
  { value: "All Orders", id: 1 }, compelte
  { value: "In process Orders", id: 5 },
  { value: "Pending Orders", id: 2 }, compelte
  { value: "Priting Orders", id: 3 }, compelte
  { value: "Ready to deliver", id: 6 },compelte
  { value: "Completed Orders", id: 4 }, compelte
]; */}
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default RiderStatusCheck;

const radioButtons = [
  { value: "All Rider", id: 1 },
  { value: "Approved Rider", id: 4 },
  { value: "Apply Rider", id: 2 },
  { value: "Blocked Rider", id: 3 },
];
