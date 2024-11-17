import React, { useState } from "react";
import { call } from "../../utils/helper";
import toast from "react-hot-toast";
import UploadFile from "../UploadFile/UploadFile";

const ToCampus = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    option: "All",
  });
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast.error("Title is required", { duration: 2000 });
    } else if (!formData.message) {
      toast.error("Message is required", { duration: 2000 });
    } else {
      try {
        setLoader(true);
        const formDataa = new FormData();
        formDataa.append("role_id", formData.option);
        formDataa.append("title", formData.title);
        formDataa.append("message", formData.message);
        formDataa.append("file_upload", file);
        const response = await call(
          "/admin/send_notification",
          "POST",
          formDataa
        );
        setFormData((prevData) => ({
          title: "",
          message: "",
          option: "All",
        }));
        setFile(null);
        setFileName("");
        setLoader(false);
        toast.success(response?.message, { duration: 2000 });
      } catch (error) {
        setLoader(false);
        toast.error(error?.message, { duration: 2000 });
      }
    }
  };

  return (
    <div className="container">
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-8">
          Advertising and Announcement
        </h1>
        <div className="flex flex-col gap-5">
          <div className="mb-4">
            <label className="block mb-2">Select Role</label>
            <select
              name="option"
              value={formData.option}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="All">All</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Rider">Rider</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter Title"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded h-32"
              placeholder="Enter your message..."
            ></textarea>
          </div>

          <UploadFile
            fileName={fileName}
            setFileName={setFileName}
            file={file}
            setFile={setFile}
          />

          <button
            type="button"
            className={`${
              loader ? "opacity-50" : "opacity-100"
            }  px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center`}
            onClick={handleSubmit}
          >
            {loader ? "Load" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToCampus;
