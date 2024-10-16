import React, { useEffect, useState } from "react";

import WalletDashboard from "./WalletDashboard";
import UploadModal from "../../../components/Modals/UploadModal";
import toast from "react-hot-toast";
import { call, defaultSelect, formatDate } from "../../../utils/helper";
import { Loader } from "../../Loaders";
import DeleteModal from "../../Modals/DeleteModal";
import NotFound from "../../Error/NotFound";

const TeacherSubject = ({ item, disable }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fileLoader, setFileLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [subject, setSubject] = useState("");
  const [currentDept, setCurrentDept] = useState({});
  const [subjectList, setSubjectList] = useState([]);

  console.log("currentDept", currentDept);
  const addUpload = async (
    fileName,
    file,
    title,
    description,
    pageNumber,
    paperSize,
    color,
    price,
    date,
    time
  ) => {
    try {
      setButtonLoader(true);
      const formData = new FormData();
      formData.append("user_id", Number(item?.user_id));
      formData.append("subject_id", subject);
      formData.append("file_upload", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("page_number", pageNumber);
      formData.append("paper_size_id", paperSize);
      formData.append("color_code_id", color);
      formData.append("total_price", price);
      formData.append("publish_or_save", "3");
      formData.append("date", date);
      formData.append("time", time);
      const response = await call("/app/create_subject_file", "POST", formData);
      await getFiles();
      setButtonLoader(false);
      setShowUploadModal(false);
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setSubjectList([]);
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const [uploads, setUploads] = useState([
    // { name: 'Module 3', date: 'Date & Time', status: 'Cancel' },
    // { name: 'Activity 2', date: 'Date & Time', status: 'Cancel' },
    // { name: 'Assignment 5', date: 'Date & Time', status: 'Cancel' },
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

  const getFiles = async (value) => {
    console.log("subject", subject);
    try {
      setFileLoader(true);
      const formData = new FormData();
      formData.append("subject_id", Number(subject));
      formData.append("files_type", "3");
      const response = await call(
        "/admin/fetch_teacher_subject_file_list",
        "POST",
        formData
      );
      setUploads(response?.data);
      setFileLoader(false);
    } catch (error) {
      setUploads([]);
      setFileLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const fetchAPIs = async () => {
    setLoader(true);
    await Promise.all([getSubject(), getFiles(subject)]);
    setLoader(false);
  };
  useEffect(() => {
    fetchAPIs();
  }, [item]);

  useEffect(() => {
    getFiles();
  }, [subject]);

  const _handleDelete = async (dept) => {
    try {
      setButtonLoader(true);
      const formData = new FormData();
      formData.append("subject_file_id", Number(currentDept?.subject_file_id));
      const response = await call(
        "/admin/delete_teacher_subject_file_list",
        "POST",
        formData
      );
      await getFiles();
      setShowDeleteModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setUploads([]);
      setFileLoader(false);
      setButtonLoader(false);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const _openDeleteModal = (dept) => {
    setCurrentDept(dept);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen p-4 ">
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 w-full mb-4 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Calendar Activity - Publish Later Features
              </h2>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
              <label className="block font-semibold mr-4 mb-2 sm:mb-0">
                Select Subject Page:
              </label>
              {/* <input
                type="text"
                className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
                value="Bio101-Section A"
                readOnly
              /> */}
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
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md ml-0 sm:ml-4 mt-2 sm:mt-0"
                onClick={() => setShowUploadModal(true)}
              >
                + Add Upload File
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">File Name</th>
                    <th className="px-4 py-2 border">Date Published</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {uploads.length === 0 ? (
                    <NotFound text={"Files not found"} />
                  ) : (
                    uploads.map((upload, index) => (
                      <tr key={index}>
                        <td
                          onClick={() =>
                            (window.location.href = upload.file_upload)
                          }
                          className="px-4 py-2 border text-center"
                        >
                          {upload.title + " - " + upload.description}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {formatDate(upload.date) + " & " + upload.time}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          <button
                            onClick={() => _openDeleteModal(upload)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-1/3 w-full">
            <WalletDashboard disable={disable} item={item} />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          confirmModal={() => _handleDelete(currentDept.subject_file_id)}
          isLoading={buttonLoader}
          delete_name={currentDept?.title}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}

      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSave={addUpload}
        publishLater={true}
        isLoading={buttonLoader}
      />
    </div>
  );
};

export default TeacherSubject;
