import React, { useState } from 'react';

import WalletDashboard from '../TeacherDashboard/WalletDashboard';
import UploadModal from "../../../components/Modals/UploadModal";

const Order = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const addUpload = (name, file, type, description) => {
    const newUpload = { name, date: new Date().toLocaleString(), type, description, status: 'Receive' };
    setUploads([...uploads, newUpload]);
  };

  const [uploads, setUploads] = useState([
    { name: 'Ready to Pick-Up', date: 'Date & Time', status: 'F05', },
    { name: 'Sorting', date: 'Date & Time', status: 'Generating' },
    { name: 'Printing', date: 'Date & Time', status: 'Generating' },
  ]);

  return (
    <div className="min-h-screen  ">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row justify-between">
        <div className="md:w-3/3 w-full mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Order Delivery DashBoard</h2>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label className="block font-semibold mr-4 mb-2 sm:mb-0">Select Subject Page:</label>
            <input
              type="text"
              className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              value=""
              readOnly
            />
            <label className="block font-semibold ml-4 mb-2 sm:mb-0"
            > Order Qty </label>
            <input
              type="text"
              className="w-full sm:w-1/4 md:w-1/3 p-2 border  rounded mb-2 sm:mb-0"
              value=""
              readOnly
            />

          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Particular File Name</th>
                  <th className="px-4 py-2 border">Ready TO Deliver</th>
                  <th className="px-4 py-2 border">Folder Name</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      <h4>Ready to PickUp</h4>
                      <input
                        type="radio"
                        id={`upload-${index}`}
                        name="upload"
                        value={upload.name}
                        className="mr-2"
                      />
                      <label htmlFor={`upload-${index}`}>{upload.name}</label>
                    </td>
                    <td className="px-4 py-2 border text-center">{upload.date}</td>
                    <td className="px-4 py-2 border flex justify-center">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">{upload.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-1/3 w-full">
          {/* tempareay remove  */}
          {/* <WalletDashboard /> */}
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
