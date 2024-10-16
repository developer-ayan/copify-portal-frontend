import React, { useEffect, useState } from "react";
import WalletDashboard from "../TeacherDashboard/WalletDashboard";
import UploadModal from "../../../components/Modals/UploadModal";
import { call } from "../../../utils/helper";
import toast from "react-hot-toast";
import { Loader } from "../../Loaders";
import NotFound from "../../Error/NotFound";

const Order = ({ item, disable }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const addUpload = (name, file, type, description) => {
    const newUpload = {
      name,
      date: new Date().toLocaleString(),
      type,
      description,
      status: "Receive",
    };
    setUploads([...uploads, newUpload]);
  };

  console.log("item", item);

  const [uploads, setUploads] = useState([]);

  const getOrders = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", Number(item?.user_id));
      const response = await call("/app/rider_dashboard", "POST", formData);
      setUploads(response?.data);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await Promise.all([getOrders()]);
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
        {loader ? (
          <Loader />
        ) : (
          <div className="md:w-2/3 w-full mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              All orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Customer claim code</th>
                    <th className="px-4 py-2 border">Order claim code</th>
                    <th className="px-4 py-2 border">Order status</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.length == 0 ? (
                    <NotFound text={"Orders not found"} />
                  ) : (
                    uploads.map((upload, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">
                          {/* <h4 className="font-bold">{upload.heading}</h4> */}
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`upload-${index}`}
                              name="upload"
                              value={upload.name}
                              className="mr-2"
                            />
                            <label htmlFor={`upload-${index}`}>
                              {upload.claim_code}
                            </label>
                          </div>
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {upload.generate_order_id}
                        </td>
                        <td className="px-4 py-3 border flex justify-center">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            {upload.order_status}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="lg:w-1/3 w-full">
          <WalletDashboard item={item} disable={disable} />
        </div>
      </div>
      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSave={addUpload}
      />
    </div>
  );
};

export default Order;
