import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Search = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate(); 

  const handleRadioChange = (id) => {
    setSelectedOrder(id);
    navigate('/dashboard/claim-station');
  };

  const handleActionClick = (action) => {
    console.log('Action clicked:', action);
    navigate('/dashboard/claim-station');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded shadow mt-9">
        <h2 className="text-2xl font-semibold mb-4 text-center">Branch Operation System</h2>
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-2/3 overflow-x-auto mb-8 lg:mb-0">
              {orders.map((orderType, idx) => (
                <div key={idx} className="mb-8">
                  <h2 className="text-xl font-bold mb-4">{orderType.type}</h2>
                  <table className="min-w-full bg-white border border-gray-200">
                    <tbody>
                    {orderType.data.map((order, index) => (
  <>
    <tr key={index} className="border-gray-200">
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
    </tr>
    <tr className="border-t border-gray-200">
      <td colSpan="7" className="px-4 py-2 border text-left">
        <div className="flex justify-start items-center">
          {order.actions.map((action, idx) => (
            <button
              key={idx}
              className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
              onClick={() => handleActionClick(action)} 
            >
              {action}
            </button>
          ))}
        </div>
      </td>
    </tr>
  </>
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
      </div>
    </div>
  );
};

export default Search;