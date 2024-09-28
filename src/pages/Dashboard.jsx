import React, { useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import SearchSection from "../components/DashBoardSection/StudentDashboard/SearchSection";
import SubscribeSubject from "../components/DashBoardSection/StudentDashboard/SubscribeSubject";
import OrderFiles from "../components/DashBoardSection/StudentDashboard/OrderFiles";
import PersonalUpload from "../components/DashBoardSection/StudentDashboard/PersonalUpload";


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);

  const [searchLoader, setSearchLoader] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchData, setSearchData] = useState([])
  const [searchName, setSearchName] = useState('');
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

  // useEffect(() => {
  //   fetchAnalytics();
  // }, []);

  const clearStates = (item, name) => {
    setSearchLoader(false)
    setShowSearchData(false)
    setSearchData(false)
    setItem(item)
    setSearchName(name)
  }

  const isEmpty = Object?.keys(item)?.length === 0;

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
              <SearchSection
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
              />
              {isEmpty ?
                <></> :
                <>
                  {selectedOption === 1 && <SubscribeSubject item={item} />}
                  {selectedOption === 2 && <OrderFiles item={item} />}
                  {selectedOption === 3 && <PersonalUpload item={item} />}
                </>
              }


            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
