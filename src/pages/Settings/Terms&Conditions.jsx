import React, { useState } from "react";
import { Loader, Page } from "../../components";
import Search from "../../components/DashBoardSection/Claim station/Search";
import OrderDetails from "../../components/DashBoardSection/Claim station/OrderDetails";

const Terms = () => {
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
            <Search />
          </main>
          {selectedOption === 1 && <OrderDetails />}
        </div>
      </div>
    </Page>
  );
};

export default Terms;