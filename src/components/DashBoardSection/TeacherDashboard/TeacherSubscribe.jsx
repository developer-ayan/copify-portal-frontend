import React, { useEffect, useState } from "react";
import WalletDashboard from "./WalletDashboard";
import { call, defaultSelect, getValueById } from "../../../utils/helper";
import { Loader } from "../../Loaders";
import toast from "react-hot-toast";

const TeacherSubscribe = ({ item, disable }) => {
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [currentDept, setCurrentDept] = useState({});
  const [loader, setLoader] = useState(false);
  const [uploads, setUploads] = useState([
    { name: "Student 1", course: "BSed English", year: "2nd year" },
    { name: "Student 2", course: "BSed Mathematics", year: "2nd year" },
    { name: "Student 3", course: "BSed Social Studies", year: "3rd year" },
  ]);

  const getSubject = async (value) => {
    try {
      const formData = new FormData();
      formData.append("user_id", Number(item?.user_id));
      const response = await call(
        "/admin/fetch_teacher_subject_list",
        "POST",
        formData
      );
      setSubject(defaultSelect(response?.data, "id"));
      setSubjectList(response?.data);
    } catch (error) {
      setSubjectList([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const getSubscibers = async (value) => {
    try {
      const formData = new FormData();
      formData.append("teacher_id", Number(item?.user_id));
      formData.append("subject_id", Number(subject));
      const response = await call(
        "/admin/fetch_teacher_subscriber_list",
        "POST",
        formData
      );
      setUploads(response?.data);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await Promise.all([getSubject(), getSubscibers(subject)]);
    setLoader(false);
  };

  useEffect(() => {
    fetchAPIs();
  }, [item]);

  useEffect(() => {
    getSubscibers();
  }, [subject]);

  return (
    <div className="min-h-screen p-4 ">
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 w-full mb-4 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Subscribe Student Details
              </h2>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-semibold mr-4 mb-2 sm:mb-0">
                Select Subject Page:
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              >
                <option value="" disabled>
                  Select subject
                </option>
                {subjectList?.map((item, index) => {
                  return <option value={item.id}>{item.value}</option>;
                })}
              </select>
              <label className="block font-semibold mr-4 ml-0 sm:ml-4 mb-2 sm:mb-0">
                Total Subscribers:
              </label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                value={uploads?.length || "0"}
                readOnly
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border text-center">
                      Student Name
                    </th>
                    <th className="px-4 py-2 border text-center">
                      Course & Major
                    </th>
                    <th className="px-4 py-2 border text-center">Year Level</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.map((upload, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-center">
                        {upload.name}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {getValueById(subjectList, subject, "id")}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {upload.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <WalletDashboard disable={disable} item={item} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSubscribe;
