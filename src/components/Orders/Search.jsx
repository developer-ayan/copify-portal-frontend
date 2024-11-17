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
import { Link } from "react-router-dom";
import NotFound from "../Error/NotFound";

const Search = () => {
  const { user, setOrderDetail } = useContext(AppContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // Added state for sorting option

  const handleRadioChange = (id) => {
    setSelectedOrder(id);
  };

  const getOrders = async () => {
    try {
      const formData = new FormData();
      formData.append("branch_id", (user?.user_id).toString());
      const response = await call("/app/fetch_branch_orders", "POST", formData);
      const filter = response.data.filter(
        (item, index) =>
          item.order_status != "completed" && item.order_status != "cancel"
      );
      setUploads(filter);
    } catch (error) {
      setUploads([]);
      console.log("error?.message", error?.message);
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

  // Sorting the orders based on selected sort option
  const sortedUploads = () => {
    switch (sortOption) {
      case "newest":
        return [...uploads].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "oldest":
        return [...uploads].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      case "priority":
        return [...uploads].sort((a, b) => (a.priority ? -1 : 1));
      default:
        return uploads;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 rounded shadow mt-9">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Branch Operation System
          </h2>

          {/* Dropdown for sorting */}
          <div className="mb-4">
            <label htmlFor="sortOption" className="mr-2">
              Sort by:
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="container mx-auto p-4">
            {sortedUploads().length > 0 ? (
              <div className="mb-8">
                {sortedUploads().map((order, index) => (
                  <table className="min-w-full bg-white border border-gray-200 mt-2">
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
                      const arr = fileColorDropdown.find(
                        (color) => color.id == item.color_code_id
                      );

                      return (
                        <table className="min-w-full bg-white border border-gray-200">
                          <tbody>
                            <React.Fragment key={`${order.id}-${itemIndex}`}>
                              <tr className="border-gray-200">
                                <Link
                                  to="/dashboard/claim-station"
                                  className="hover:text-blue-400 hover:underline"
                                  onClick={() => setOrderDetail(order)}
                                >
                                  <td className="px-4 py-2 border text-center">
                                    <div className="flex justify-center items-center">
                                      <input
                                        type="radio"
                                        name="order"
                                        value={order.id}
                                        checked={selectedOrder === order.id}
                                        onChange={() => setOrderDetail(order)}
                                      />
                                    </div>
                                  </td>
                                </Link>
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
                                {/* <td className="px-4 py-2 border">
                                  {(order.qty || "1") + " " + "Copies"}
                                </td> */}
                                <td className="px-4 border">
                                  <div className="flex justify-start items-center">
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
                          <button className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded">
                            {order?.order_status}
                          </button>
                          <button className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded capitalize">
                            {order?.transaction_type || "Wallet"}
                          </button>
                          <button className="bg-blue-500 text-white text-xs font-semibold mr-2 mb-2 px-2 py-2 rounded">
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
              <table className="min-w-full bg-white border border-gray-200 mt-2">
                <NotFound text={"Record not found!"} />
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
