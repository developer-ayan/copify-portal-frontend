import React, { useContext, useEffect, useState } from "react";
import { Loader, Page } from "../../components";
import Search from "../../components/DashBoardSection/Claim station/Search";
import { AppContext } from "../../context";
import OrderDetails from "../../components/DashBoardSection/Claim station/OrderDetails";

const Terms = () => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);

  const [searchLoader, setSearchLoader] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [disable, setDisable] = useState(false);
  const [item, setItem] = useState({});


  useEffect(() => {
    if (user.role_id == 3) {
      setItem(user);
      setSearchName(user.name);
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [user]);

  const clearStates = (item, name) => {
    setSearchLoader(false);
    setShowSearchData(false);
    setSearchData(false);
    setItem(item);
    setSearchName(name);
  };

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
              <Search
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
              />
              <OrderDetails item={item} />
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Terms;
