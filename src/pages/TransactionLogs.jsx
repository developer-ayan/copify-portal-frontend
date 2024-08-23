import React from "react";
import { Loader, Page } from "../components";
import CopifyShop from "../components/Branches/CopifyBranches"
import Extension from "../components/Branches/Extension"

const shop = () => {
 

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
       <CopifyShop/>
   <Extension/>
          </main>
        </div>
      </div>
    </Page>
  );
};

export default shop;