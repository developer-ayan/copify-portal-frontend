import React, { useContext, useEffect, useState } from "react";
import DonutChart from "../NavOptions/DonutChart";
import {
  call,
  formatDate,
  formatTime,
  toFixedMethod,
} from "../../utils/helper";
import { AppContext } from "../../context";
import toast from "react-hot-toast";
import { Loader } from "../Loaders";
import { fileColorDropdown } from "../../constants/data";

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
        actions: ["Wallet Paid", "Check", "Printing", "View", "Generating"],
      },
    ],
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
        actions: ["Wallet Paid", "Check", "Printing", "View", "Generating"],
      },
      {
        id: "CDK000124",
        customer: "Paulo Lopez",
        size: "Short Size",
        color: "Black and White",
        pages: "25 Pages",
        copies: "1 Copies",
        actions: ["CUP", "Check", "Print", "View", "Claim No."],
      },
    ],
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
        actions: ["COD/Filed", "Check", "Done Print", "View", "Folder 05"],
      },
    ],
  },
];

const Search = () => {
  const { user } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([]);

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

  const EditOrderStatus = async (order_id) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("order_status", "completed");
      const response = await call("/app/edit_order_status", "POST", formData);
      fetchAPIs();
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await getOrders();
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs();
  }, []);

  // const PriorityOrders = uploads?.filter((item, index) => item.priority)
  // const CampusOrder = uploads?.filter((item, index) => item.order_status != "completed")
  // const CompleteOrder = uploads?.filter((item, index) => item.order_status == "completed")

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded shadow mt-9">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Branch Operation System
          </h2>
          <div className="container mx-auto p-4">
            {/* <div className="flex flex-wrap lg:flex-nowrap"> */}
            {/* <div className="w-full lg:w-2/3 overflow--auto mb-8 lg:mb-0"> */}
            {/* {orders.map((orderType, idx) => ( */}
            {uploads.length > 0 ? (
              <div className="mb-8">
                {uploads?.map((order, index) => (
                  <table className="min-w-full bg-white border border-gray-200 mt-2 ">
                    <div className="flex justify-between items-center mb-4 pt-3 pl-4 pr-4">
                      <h2 className="text-xl font-bold">
                        {order?.priority && `Priority`} (CN{" "}
                        {order?.user_detail?.name?.toUpperCase() || ""})
                      </h2>
                      <span className="text-lg font-semibold">
                        {toFixedMethod(order?.total_price)} PHP
                      </span>
                    </div>
                    {order.subjectFiles.map((item, itemIndex) => {
                      // Find the color based on the color_code_id
                      const arr = fileColorDropdown.find(
                        (color) => color.id == item.color_code_id
                      );

                      console.log("order", order);

                      return (
                        <table className="min-w-full bg-white border border-gray-200">
                          <tbody>
                            <React.Fragment key={`${order.id}-${itemIndex}`}>
                              {" "}
                              {/* Unique key for each fragment */}
                              <tr className="border-gray-200">
                                {/* <td className="px-4 py-2 border text-center">
                                      <div className="flex justify-center items-center">
                                        <input
                                          type="radio"
                                          name="order"
                                          value={order.id}
                                          checked={selectedOrder === order.id}
                                          onChange={() => handleRadioChange(order.id)}
                                        />
                                      </div>
                                    </td> */}
                                <td className="px-4 py-2 border">
                                  {order.claim_code}
                                </td>
                                <td className="px-4 py-2 border">
                                  {order?.user_detail?.name}
                                </td>
                                <td className="px-4 py-2 border">
                                  {item?.paper_size?.paper_size}
                                </td>
                                <td className="px-4 py-2 border">
                                  {arr?.value}
                                </td>
                                <td className="px-4 py-2 border">
                                  {item.page_number + " " + "Pages"}
                                </td>
                                <td className="px-4 py-2 border">
                                  {(order.qty || "1") + " " + "Copies"}
                                </td>
                                <td className="px-4 py-2 border">
                                  {(order.qty || "1") + " " + "Copies"}
                                </td>
                                <td className="px-4 border">
                                  <div className="flex justify-start items-center">
                                    {/* Uncomment this section if you need to display action buttons */}
                                    {order?.rider_id == "undefined" &&
                                      order?.order_status != "completed" && (
                                        <>
                                          {order?.order_status == "cancle" ? (
                                            <></>
                                          ) : (
                                            <button
                                              onClick={() =>
                                                EditOrderStatus(order?.order_id)
                                              }
                                              className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                                            >
                                              {"Complete"}
                                            </button>
                                          )}
                                        </>
                                      )}

                                    <button
                                      onClick={() =>
                                        (window.location.href =
                                          item.file_upload)
                                      }
                                      className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                                    >
                                      {"View"}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          </tbody>
                        </table>
                      );
                    })}
                    <tr className="border-t border-gray-200">
                      <td colSpan="7" className="px-4 py-2 border text-left">
                        <div className="flex justify-start items-center">
                          <button className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded">
                            {order?.generate_order_id}
                          </button>
                          <button
                            // onClick={() => EditOrderStatus(order?.order_id)}
                            className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                          >
                            {order?.order_status}
                          </button>
                          <button
                            // onClick={() => EditOrderStatus(order?.order_id)}
                            className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded capitalize"
                          >
                            {order?.transaction_type
                              ? order?.transaction_type
                              : "Wallet"}
                          </button>
                          <button
                            // onClick={() => EditOrderStatus(order?.order_id)}
                            className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                          >
                            {formatDate(order.created_at) +
                              " - " +
                              formatTime(order.created_at)}
                          </button>
                        </div>
                      </td>
                    </tr>
                  </table>
                ))}
              </div>
            ) : (
              <></>
            )}
            {/* {CampusOrder.length > 0 ?
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
            {/* <tr className="border-gray-200">
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
            {/* <tr className="border-gray-200">
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
            {/* <button
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
                } */}

            {/* ))} */}
          </div>
          {/* <div className="w-full lg:w-1/3 flex justify-center items-center">
                <DonutChart />
              </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default Search;
