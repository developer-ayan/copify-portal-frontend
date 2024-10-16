import React, { useEffect, useState } from "react";
import Modal from "../../Modals/Modal";
import WalletDashboard from "../TeacherDashboard/WalletDashboard";
import { call } from "../../../utils/helper";
import { Loader } from "../../Loaders";
import toast from "react-hot-toast";
import DeleteModal from "../../Modals/DeleteModal";
import NotFound from "../../Error/NotFound";

const SubscribeSection = ({ item, disable }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const [unsubscribeSubject, setUnsubscribeSubject] = useState({});
  const [subscribe, setSubscribe] = useState([]);

  const handleChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleUnsubscribe = (subject) => {
    setUnsubscribeSubject(subject);
    setShowAlert(true);
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const _handleDelete = async () => {
    try {
      setButtonLoader(true);
      const formData = new FormData();
      formData.append("user_id", unsubscribeSubject?.user_id);
      formData.append("teacher_id", unsubscribeSubject?.teacher_id);
      formData.append("subject_id", unsubscribeSubject?.subject_id);
      const response = await call(
        "/app/create_subscribe_subject_for_student",
        "POST",
        formData
      );
      await getSubscribers();
      setButtonLoader(false);
      setShowAlert(false);
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      toast.error(error?.message, { duration: 2000 });
      setButtonLoader(false);
    }
  };

  const getSubscribers = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", Number(item?.user_id));
      const response = await call(
        "/admin/fetch_subscribe_subject_for_student",
        "POST",
        formData
      );
      setSubscribe(response?.data);
    } catch (error) {
      setSubscribe([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await Promise.all([getSubscribers()]);
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
      {loader ? (
        <Loader />
      ) : (
        <div className="md:w-2/3 w-full mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Subscribe Subject
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Subject</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribe.length === 0 ? (
                  <NotFound text={"Subscribed subject not found!"} />
                ) : (
                  subscribe.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        <div className="flex items-center justify-center">
                          <label
                            htmlFor={`subscribe-${index}`}
                            className="mr-4"
                          >
                            {item.subject_name}
                          </label>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleUnsubscribe(item)}
                        >
                          Unsubscribe
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

      <div className="md:w-1/3 w-full">
        <WalletDashboard disable={disable} item={item} />
      </div>

      {showAlert && (
        <DeleteModal
          confirmModal={_handleDelete}
          isLoading={buttonLoader}
          delete_name={unsubscribeSubject?.subject_name}
          customMessage={`Are you sure you want to unsubscribe from ${unsubscribeSubject?.subject_name}?`}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SubscribeSection;
