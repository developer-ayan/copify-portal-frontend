import React, { useContext, useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import SearchSection from "../components/DashBoardSection/RiderDashboard/RidersSearch";
import { AppContext } from "../context";
import Order from "../components/DashBoardSection/RiderDashboard/Order";
import PickUp from "../components/DashBoardSection/RiderDashboard/PickUp";
import Sorting from "../components/DashBoardSection/RiderDashboard/Sorting";
import Transection from "../components/DashBoardSection/RiderDashboard/Transection";
import ReadyToDeliver from "../components/DashBoardSection/RiderDashboard/ReadyToDeliver";
import InProcess from "../components/DashBoardSection/RiderDashboard/InProcess";
import RiderStatus from "../components/DashBoardSection/RiderDashboard/RiderStatus";
import OrderLogOrder from "./OrderLogOrder";

const OrderLogs = () => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);

  const [searchLoader, setSearchLoader] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchName, setSearchName] = useState("");
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
              {/* <div className="flex justify-center flex-wrap">
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
              </div> */}
              {/* {selectedOption === 0 && (
                    // all order
                    <RiderStatus disable={disable} item={item} />
                  )} */}
              {selectedOption === 1 && (
                // all order
                <OrderLogOrder disable={disable} item={item} />
              )}
              {selectedOption === 2 && (
                // Pending Orders
                <PickUp disable={disable} item={item} />
              )}
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default OrderLogs;

const radioButtons = [
  { value: "Orders", id: 1 },
  { value: "Trasactions", id: 5 },
];
