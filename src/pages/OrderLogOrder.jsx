import React, { useContext, useEffect, useState } from "react";
import DonutChart from "../components/NavOptions/DonutChart";
import { call, formatDate, formatTime, toFixedMethod } from "../utils/helper";
import { AppContext } from "../context";
import toast from "react-hot-toast";
import { Loader } from "../components";
import { fileColorDropdown } from "../constants/data";
import DateRangePicker from "../components/DateRangePicker/DateRangePicker";

const OrderLogOrder = () => {
  const { user } = useContext(AppContext);
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectBranch, setSelectBranch] = useState("");

  const getOrders = async (start_date, end_date) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("branch_id", selectBranch || (user?.user_id).toString());
      formData.append(
        "start_date",
        start_date ? new Date(start_date) : "2024-01-01"
      );
      formData.append("end_date", end_date ? new Date(end_date) : new Date());

      const response = await call(
        "/app/fetch_branch_orders_date_range",
        "POST",
        formData
      );
      setUploads(response?.data);
      setLoader(false);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
      setLoader(false);
    }
  };

  const getBranches = async (start_date, end_date) => {
    try {
      const response = await call("/app/fetch_branch_list", "POST");
      setBranches(response?.data);
    } catch (error) {
      setBranches([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const EditOrderStatus = async (order_id, end_date) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("order_status", "completed");
      const response = await call("/app/edit_order_status", "POST", formData);
      await getOrders();
      await getBranches();
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await getOrders();
    await getBranches();
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs();
  }, [selectBranch]);

  const totalPriceReduce = uploads.reduce(
    (sum, file) => parseFloat(sum) + parseFloat(file.total_price),
    0
  );

  console.log("branches", branches);

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
            Order logs
          </h2>
          <div className="container mx-auto p-4">
            {/* <div className="w-full lg:w-2/3 overflow-x-auto mb-8 lg:mb-0"> */}
            <div>
              <div className="flex">
                <DateRangePicker
                  onClick={(start_date, end_date) =>
                    getOrders(start_date, end_date)
                  }
                />
                {user?.role_id == 1 ? (
                  <select
                    value={selectBranch}
                    onChange={(e) => {
                      setSelectBranch(e.target.value);
                    }}
                    className="w-full sm:w-1/4 md:w-1/5 p-2 border border-gray-300 rounded ml-5"
                  >
                    <option value="" disabled>
                      Select Branch
                    </option>
                    {branches?.map((item, index) => {
                      return (
                        <option value={item.branch_id}>{item.name}</option>
                      );
                    })}
                  </select>
                ) : (
                  <></>
                )}
              </div>
              <h2 className="text-xl font-regular mt-5 mb-5">
                TOTAL EARNING : {toFixedMethod(totalPriceReduce)} PHP
              </h2>
            </div>

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
                                    {order?.rider_id != "undefined" &&
                                    order?.order_status != "completed" &&
                                    user?.role_id == "2" ? (
                                      <button
                                        onClick={() =>
                                          EditOrderStatus(order?.order_id)
                                        }
                                        className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded"
                                      >
                                        {"Complete"}
                                      </button>
                                    ) : (
                                      <></>
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
            {/* </div> */}
            {/* <div className="w-full lg:w-1/3 flex justify-center items-center">
                <DonutChart />
              </div> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderLogOrder;
