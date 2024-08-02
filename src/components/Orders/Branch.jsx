import React, { useState } from 'react';
import DonutChart from '../NavOptions/DonutChart';

const orders = [
  {
    type: "Priority Orders",
    data: [
      {
        id: "CDK000252",
        customer: "Sunshy Cruz",
        size: "A4 Size",
        color: "Black and White",
        pages: "10 Pages",
        copies: "3 Copies",
        actions: ["Wallet Paid", "Check", "Printing", "View", "Generating"]
      }
    ]
  },
  {
    type: "Campus Printing Order",
    data: [
      {
        id: "CDK001253",
        customer: "Andrea Lopez",
        size: "Short Size",
        color: "Black and White",
        pages: "8 Pages",
        copies: "1 Copies",
        actions: ["Wallet Paid", "Check", "Printing", "View", "Generating"]
      },
      {
        id: "CDK000124",
        customer: "Paulo Lopez",
        size: "Short Size",
        color: "Black and White",
        pages: "25 Pages",
        copies: "1 Copies",
        actions: ["CUP", "Check", "Print", "View", "Claim No."]
      }
    ]
  },
  {
    type: "Done Printing Orders",
    data: [
      {
        id: "CDK000001",
        customer: "Andrea Lopez",
        size: "Short Size",
        color: "Black and White",
        pages: "25 Pages",
        copies: "1 Copies",
        actions: ["COD/Filed", "Check", "Done Print", "View", "Folder 05"]
      }
    ]
  }
];

const Branch = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRadioChange = (id) => {
    setSelectedOrder(id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-2/3 overflow-x-auto mb-8 lg:mb-0">
          {orders.map((orderType, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl font-bold mb-4">{orderType.type}</h2>
              <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                  {orderType.data.map((order, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-2 border text-center">
                          <div className="flex justify-center items-center">
                            <input
                              type="radio"
                              name="order"
                              value={order.id}
                              checked={selectedOrder === order.id}
                              onChange={() => handleRadioChange(order.id)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 border">{order.id}</td>
                        <td className="px-4 py-2 border">{order.customer}</td>
                        <td className="px-4 py-2 border">{order.size}</td>
                        <td className="px-4 py-2 border">{order.color}</td>
                        <td className="px-4 py-2 border">{order.pages}</td>
                        <td className="px-4 py-2 border">{order.copies}</td>
                        {/* <button
                                key={idx}
                                className="bg-blue-500 text-white text-s font-semibold mr-2 mb-2 px-3 py-3 rounded"
                              >
                                {action}
                              </button> */}
                        
                      </tr>
                 
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/3 flex justify-center items-center">
          <DonutChart />
        </div>
      </div>
    </div>
  );
};

export default Branch;
