import React, { useState } from "react";
import { Loader, Page } from "../../components";
import EducationSearch from "../../components/DashBoardSection/Education/EducationSearch";
import Dept from "../../components/DashBoardSection/Education/Dept";
import { call } from "../../utils/helper";
import toast from "react-hot-toast";

const Terms = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [uploads, setUploads] = useState([]);

  const search_institite = async (value) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('search', value)
      console.log('formData', formData)
      const response = await call('/admin/search_institute', 'POST', formData)
      setUploads(response?.data)
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setUploads([])
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };
  

  return (
    <Page
      title="Collegio de Kidapawan Branch"
      containerStyles="relative !bg-[#EEF2F5] !p-0"
      headerStyles="px-5 !m-0 !py-2 bg-white"
      enableHeader
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <main className="p-8">
            <EducationSearch isLoading={buttonLoader} searchMethod={search_institite} />
          </main>
          <Dept searchDataFromChild={uploads} buttonLoaderStatefromParent={buttonLoader} buttonLoaderSetStatefromParent={setButtonLoader} />
        </div>
      </div>
    </Page>
  );
};

export default Terms;