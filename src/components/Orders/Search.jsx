import React, { useContext, useEffect, useState } from 'react';
import DonutChart from '../NavOptions/DonutChart';
import { call } from '../../utils/helper';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { Loader } from '../Loaders';
import { fileColorDropdown } from '../../constants/data';

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
  const { user } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([])

  const handleRadioChange = (id) => {
    setSelectedOrder(id);
  };



  const getOrders = async () => {
    try {
      const formData = new FormData();
      formData.append("branch_id", (user?.user_id).toString());
      const response = await call("/app/fetch_branch_orders", "POST", formData);
      setUploads(response?.data);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await getOrders()
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs()
  }, [])


  const PriorityOrders = uploads?.filter((item, index) => item.priority)
  const CampusOrder = uploads?.filter((item, index) => item.order_status != "completed")
  const CompleteOrder = uploads?.filter((item, index) => item.order_status == "completed")

  console.log("upload", PriorityOrders)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {loader ? <Loader /> :
        <div className="bg-white p-6 rounded shadow mt-9">
          <h2 className="text-2xl font-semibold mb-4 text-center">Branch Operation System</h2>
          <div className="container mx-auto p-4">
            <div className="flex flex-wrap lg:flex-nowrap">
              <div className="w-full lg:w-2/3 overflow-x-auto mb-8 lg:mb-0">
                {/* {orders.map((orderType, idx) => ( */}
                {PriorityOrders.length > 0 ?
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{"Priority orders"}</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                      <tbody>
                        {PriorityOrders?.map((order, index) => (
                          order.subjectFiles.map((item, itemIndex) => {
                            // Find the color based on the color_code_id
                            const arr = fileColorDropdown.find(color => color.id == item.color_code_id);
                            console.log("arr", arr)

                            return (
                              <React.Fragment key={`${order.id}-${itemIndex}`}> {/* Unique key for each fragment */}
                                <tr className="border-gray-200">
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
                                  <td className="px-4 py-2 border">{order.claim_code}</td>
                                  <td className="px-4 py-2 border">{order?.user_detail?.name}</td>
                                  <td className="px-4 py-2 border">{item?.paper_size?.paper_size}</td>
                                  <td className="px-4 py-2 border">{arr?.value}</td>
                                  <td className="px-4 py-2 border">{item.page_number + " " + "Pages"}</td>
                                  <td className="px-4 py-2 border">{(order.qty || "1") + " " + "Copies"}</td>
                                </tr>
                                <tr className="border-t border-gray-200">
                                  <td colSpan="7" className="px-4 py-2 border text-left">
                                    <div className="flex justify-start items-center">
                                      {/* Uncomment this section if you need to display action buttons */}
                                      <button
                                        onClick={() =>
                                          (window.location.href = item.file_upload)
                                        }
                                        className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                                      >
                                        {"View"}
                                      </button>

                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })
                        ))}
                      </tbody>
                    </table>
                  </div> : <></>
                }
                {CampusOrder.length > 0 ?
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{"Campus Printing Order"}</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                      <tbody>
                        {CampusOrder?.map((order, index) => (
                          order.subjectFiles.map((item, itemIndex) => {
                            // Find the color based on the color_code_id
                            const arr = fileColorDropdown.find(color => color.id == item.color_code_id);
                            console.log("arr", arr)

                            return (
                              <React.Fragment key={`${order.id}-${itemIndex}`}> {/* Unique key for each fragment */}
                                <tr className="border-gray-200">
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
                                  <td className="px-4 py-2 border">{order.claim_code}</td>
                                  <td className="px-4 py-2 border">{order?.user_detail?.name}</td>
                                  <td className="px-4 py-2 border">{item?.paper_size?.paper_size}</td>
                                  <td className="px-4 py-2 border">{arr?.value}</td>
                                  <td className="px-4 py-2 border">{item.page_number + " " + "Pages"}</td>
                                  <td className="px-4 py-2 border">{(order.qty || "1") + " " + "Copies"}</td>
                                </tr>
                                <tr className="border-t border-gray-200">
                                  <td colSpan="7" className="px-4 py-2 border text-left">
                                    <div className="flex justify-start items-center">
                                      {/* Uncomment this section if you need to display action buttons */}
                                      {/* {order.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                  >
                    {action}
                  </button>
                ))} */}
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })
                        ))}
                      </tbody>
                    </table>
                  </div> : <></>
                }

                {CompleteOrder.length > 0 ?
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{"Done Printing Orders"}</h2>
                    <table className="min-w-full bg-white border border-gray-200">
                      <tbody>
                        {CompleteOrder?.map((order, index) => (
                          order.subjectFiles.map((item, itemIndex) => {
                            // Find the color based on the color_code_id
                            const arr = fileColorDropdown.find(color => color.id == item.color_code_id);
                            console.log("arr", arr)

                            return (
                              <React.Fragment key={`${order.id}-${itemIndex}`}> {/* Unique key for each fragment */}
                                <tr className="border-gray-200">
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
                                  <td className="px-4 py-2 border">{order.claim_code}</td>
                                  <td className="px-4 py-2 border">{order?.user_detail?.name}</td>
                                  <td className="px-4 py-2 border">{item?.paper_size?.paper_size}</td>
                                  <td className="px-4 py-2 border">{arr?.value}</td>
                                  <td className="px-4 py-2 border">{item.page_number + " " + "Pages"}</td>
                                  <td className="px-4 py-2 border">{(order.qty || "1") + " " + "Copies"}</td>
                                </tr>
                                <tr className="border-t border-gray-200">
                                  <td colSpan="7" className="px-4 py-2 border text-left">
                                    <div className="flex justify-start items-center">
                                      {/* Uncomment this section if you need to display action buttons */}
                                      {/* {order.actions.map((action, idx) => (
 <button
   key={idx}
   className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
 >
   {action}
 </button>
))} */}
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })
                        ))}
                      </tbody>
                    </table>
                  </div> : <></>
                }

                {/* ))} */}
              </div>
              <div className="w-full lg:w-1/3 flex justify-center items-center">
                <DonutChart />
              </div>
            </div>
          </div>
        </div>
      }

    </div >
  );
};

export default Search;
