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
    { name: 'CDK000005', date: 'Date & Time', status: 'Delivered' },
    { name: 'CDK000158', date: 'Date & Time', status: 'Delivered' },
    { name: 'CDK000058', date: 'Date & Time', status: 'Delivered' },
    { name: 'CDK000548', date: 'Date & Time', status: 'Delivered' },
  ]);

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/3 w-full mb-4 lg:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Delivery Dashboard</h2>
          </div>
          <div className="mb-4 flex flex-col sm:flex-row items-center sm:items-start">
            <div className="flex items-center mb-2 sm:mb-0">
              <label className="block font-semibold mr-4">Select Code/Name:</label>
              <input
                type="text"
                className="w-full sm:w-1/2 md:w-full p-2 border border-gray-300 rounded mb-2 sm:mb-0"
              />
            </div>
            <div className="flex items-center ml-0 sm:ml-4 mb-2 sm:mb-0">
              <label className="block font-semibold mr-4">Filter Date:</label>
              <input
                type="text"
                className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded"
                value=""
                readOnly
              />
              <label className="block font-semibold mx-2">to</label>
              <input
                type="text"
                className="w-full sm:w-1/4 md:w-1/3 p-2 border border-gray-300 rounded"
                value=""
                readOnly
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Customer Code</th>
                  <th className="px-4 py-2 border">Date of Received</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`upload-${index}`}
                          name="upload"
                          value={upload.name}
                          className="mr-2"
                        />
                        <label htmlFor={`upload-${index}`}>{upload.name}</label>
                      </div>
                    </td>
                    <td className="px-4 py-2 border text-center">{upload.date}</td>
                    <td className="px-4 py-3 border flex justify-center">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md">{upload.status}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:w-1/3 w-full">
          <WalletDashboard />
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
