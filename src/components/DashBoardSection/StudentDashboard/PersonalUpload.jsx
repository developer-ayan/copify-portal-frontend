import React, { useState } from 'react';
import UploadModal from "../../Modals/UploadModal";
import DetailsModal from '../../Modals/DetailsModal';


const PersonalUpload = () => {
  const [uploads, setUploads] = useState([
    { name: 'Bio203 - Section B Project', date: 'Date & Time', type: 'Science', description: 'Description of Bio203 project', status: 'Receive' },
    { name: 'Mktg112 - Section C Activity', date: 'Date & Time', type: 'Marketing', description: 'Description of Mktg112 activity', status: 'Receive' },
    { name: 'Mktg112 - Section C Case Study', date: 'Date & Time', type: 'Marketing', description: 'Description of Mktg112 case study', status: 'Receive' },
    { name: 'Acct101 - Section B Activity', date: 'Date & Time', type: 'Accounting', description: 'Description of Acct101 activity', status: 'Receive' },
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  const addUpload = (name, file, type, description) => {
    const newUpload = { name, date: new Date().toLocaleString(), type, description, status: 'Receive' };
    setUploads([...uploads, newUpload]);
  };

  const handleDetailsClick = (upload) => {
    setCurrentDetails(upload);
    setShowDetailsModal(true);
  };

  return (
    <div className="bg-white rounded shadow p-6 text-center relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-left">Personal Upload</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => setShowUploadModal(true)}
        >
          + Add Upload File
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Particular File Name</th>
              <th className="px-4 py-2 border">Date Published</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((upload, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{upload.name}</td>
                <td className="px-4 py-2 border">{upload.date}</td>
                <td className="px-4 py-2 border flex flex-wrap gap-2 justify-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => handleDetailsClick(upload)}
                  >
                    Details
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Receive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSave={addUpload}
      />
      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={currentDetails}
      />
    </div>
  );
};

export default PersonalUpload;
