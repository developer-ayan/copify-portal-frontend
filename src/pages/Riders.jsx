import React, { useEffect, useState } from "react";
import { base_url } from "../components";
import { Loader, Page } from "../components";
import RidersSearch from "../components/DashBoardSection/RiderDashboard/RidersSearch";
import Order from "../components/DashBoardSection/RiderDashboard/Order"
import PickUp from "../components/DashBoardSection/RiderDashboard/PickUp"
import Sorting from "../components/DashBoardSection/RiderDashboard/Sorting"
import Transection from "../components/DashBoardSection/RiderDashboard/Transection"

const WorkTypes = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${base_url}/super-admin-dashboard`);
      const json = await res.json();
      if (json.success) {
        setAnalytics(json.success.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <Page
      title="Collegio de Kidapawan Branch"
      containerStyles="relative !bg-[#EEF2F5] !p-0"
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
              <RidersSearch
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              {selectedOption === 1 && <Order />}
               {selectedOption === 2 && <PickUp />}
              {selectedOption === 3 && <Sorting />}
              {selectedOption === 4 && <Transection />} 
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default WorkTypes;
