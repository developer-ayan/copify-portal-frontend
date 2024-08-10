import React, { useState } from 'react';
import AddRider from '../EnvironmentModal/AddRider';
import EditInstituteModal from '../EnvironmentModal/EnvironmentEdit'; 
import { Loader } from '../../Loaders';

const RiderRadius = () => {
  const [showRiderRadius, setShowRiderRadius] = useState(false); 
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddRadius = (newRadius) => {
    if (!newRadius || typeof newRadius !== 'string') {
      setErrorMessage("Invalid radius value.");
      return;
    }

    
    const radiusExists = uploads.some(upload => upload.name === newRadius);

    if (radiusExists) {
      setErrorMessage("This radius already exists.");
      return;
    }

    
    setIsLoading(true); 
    setUploads([...uploads, { name: newRadius, status: "" }]);
    setIsLoading(false); 
    setErrorMessage(""); 
    setShowRiderRadius(false); 
  };

  const saveEdit = (oldName, newName) => {
    if (!newName || typeof newName !== 'string') {
      setErrorMessage("Invalid name.");
      return;
    }
    
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.name === oldName ? { ...upload, name: newName } : upload
      )
    );
    setShowEditModal(false); 
  };

  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Rider Radius</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowRiderRadius(true)} 
            disabled={isLoading} 
          >
            + Add Radius
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Miles</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.name}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentDept(upload); 
                        setShowEditModal(true); 
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRiderRadius && (
        <AddRider
          show={showRiderRadius}
          onClose={() => setShowRiderRadius(false)} 
          onSave={handleAddRadius}
          isLoading={isLoading}
        />
      )}

      {showEditModal && (
        <EditInstituteModal
          isLoading={buttonLoader}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveEdit} 
          currentInstitute={currentDept} 
        />
      )}
    </div>
  );
};

export default RiderRadius;
