import React, { useState } from "react";
import { Loader, Page } from "../components";
import  RiderRadius from "../components/EnvironmentalSetup/Section/RiderRadius"


const Education = () => {
  const [selectedOption, setSelectedOption] = useState(1);

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
          <RiderRadius />
          </main>
          
        </div>
      </div>
    </Page>
  );
};

export default Education;