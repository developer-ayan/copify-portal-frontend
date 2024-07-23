import React, { useEffect, useState } from "react";
import { base_url } from "../../../utils/url";
import { Loader, Page } from "../../../components";
import { dashboardCards } from "../../../constants/data";
import SearchSection from "../../../components/DashBoardSection/SearchSection"
import SubscribeSection from "../../../components/DashboardSection/SubscribeSection";
const StudentDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    const url = base_url + "/super-admin-dashboard";

    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        const data = json.success.data;
        console.log("data", data);
        setIsLoading(false);
        setAnalytics(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

 
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
                <SearchSection />
                <SubscribeSection />
              </main>
            )}
          </div>
        </div>
      </Page>
    );
  };

export default StudentDashboard;
