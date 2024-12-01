import React, { useEffect, useState } from "react";
import {
  call,
  formatDate,
  philipinesDateMethod,
  toFixedMethod
} from "../../utils/helper";
import toast from "react-hot-toast";

const SubscriptionRenewModal = ({ show, onClose, onSave, isLoading }) => {
  const [price, setPrice] = useState("");
  const [colorFulPrice, setColorFulPrice] = useState("");
  const [blackAndWhitePrice, setBlackAndWhitePrice] = useState("");
  const [planId, setPlanId] = useState("");
  const [uploads, setUploads] = useState([]);

  const handleSave = () => {
    onSave(planId);
  };

  const getList = async (listLoader) => {
    try {
      const response = await call("/app/fetch_subscription_plan_list", "POST");
      const filter = response.data;
      setUploads(filter);
      // console.log("respons" , response)
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log("uploads", uploads);

  if (!show) {
    return null;
  }

  const filterPrice = uploads.find(
    (item, index) => item.subsrciption_plan_id == planId
  );

  console.log("filterPrice", filterPrice, planId);

  const start_date = philipinesDateMethod();
  const end_date = philipinesDateMethod(filterPrice?.monthAsNumber);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Renew Subscription
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>

          <div className="mb-2 flex space-x-4">
            <input
              id="text-input"
              type="text"
              value={formatDate(start_date)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
            <input
              id="text-input"
              type="text"
              value={formatDate(end_date)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </div>

          <div className="mb-2">
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              //   className="w-full px-3 py-2 border rounded-md text-sm text-gray-900"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select Plan
              </option>
              {uploads.map((item) => (
                <option
                  key={item.subsrciption_plan_id}
                  value={item.subsrciption_plan_id}
                >
                  {item.month} Month{item.month + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <input
              id="text-input"
              type="text"
              value={toFixedMethod(filterPrice?.price) + " PHP"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
            />
          </div>

          <div className="flex justify-center space-x-2 mt-5">
            <button
              className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${
                isLoading ? "opacity-50" : "opacity-100"
              }`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Load" : "Add"}
            </button>
            <button
              onClick={onClose}
              className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionRenewModal;
