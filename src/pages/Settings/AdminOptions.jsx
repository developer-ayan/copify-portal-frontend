import React, { useEffect, useState } from "react";
import { base_url } from "../../utils/url";
import { Loader, Page } from "../../components";
import TeacherSerach from "../../components/DashBoardSection/TeacherDashboard/TeacherSerach";
import TeacherSubject from "../../components/DashBoardSection/TeacherDashboard/TeacherSubject";
import TeacherSubscribe from "../../components/DashBoardSection/TeacherDashboard/TeacherSubscribe";
import TeacherUpload from "../../components/DashBoardSection/TeacherDashboard/TeacherUpload"
import TeacherFiles from "../../components/DashBoardSection/TeacherDashboard/TeacherFiles"




const getUrl = `${base_url}/setting`;
const editUrl = `${base_url}/edit-setting`;

const AdminOptions = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(1);

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
              <TeacherSerach
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              {selectedOption === 1 && <TeacherSubject />}
              {selectedOption === 2 && <TeacherSubscribe />}
              {selectedOption === 3 && <TeacherFiles />}
              {selectedOption === 4 && <TeacherUpload />}
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default AdminOptions;
