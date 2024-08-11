import React, { useState } from 'react';
import { Loader } from '../../Loaders';
import DeliveryEdit from '../PagesModal/PagesEditModal';
import DeliveryAdd from "../PagesModal/AddPagesModal";
import DeleteModal from "../PagesModal/DeleteModal"
import toast from 'react-hot-toast';

const Pages = () => {
  const [showDelivery, setShowDelivery] = useState(false); 
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddDelivery = (newDelivery) => {
 
    const deliveryExists = uploads.some(upload => upload.name === newDelivery);

    if (deliveryExists) {
      setErrorMessage("This delivery charge already exists.");
      return;
    }

    
    if (isLoading) {
      setErrorMessage("Please wait until the current process is complete.");
      return;
    }

   
    setIsLoading(true); 
    setUploads([...uploads, { name: newDelivery, status: "" }]);
    setIsLoading(false); 
    setErrorMessage(""); 
    setShowDelivery(false); 
  };

  const saveEdit = (oldName, newName) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.name === oldName ? { ...upload, name: newName } : upload
      )
    );
    setShowEditModal(false); 
  };
  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload.shop_name !== currentDept?.shop_name));
    setShowDeleteModal(false);
    toast.success('Institute deleted successfully', { duration: 2000 });
  };
  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="mt-7 bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">  
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Paper Sizes</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowDelivery(true)} 
            disabled={isLoading}
          >
            + Add Paper size
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Paper Size</th>
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
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => { setCurrentDept(upload); setShowDeleteModal(true); }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal isLoading={buttonLoader} delete_name={currentDept?.shop_name} confirmModal={() => deleteShop()} closeModal={() => setShowDeleteModal(false)} />
      )}


      {showEditModal && (
        <DeliveryEdit
          isLoading={buttonLoader}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveEdit} 
          currentInstitute={currentDept} 
        />
      )}
      {showDelivery && (
        <DeliveryAdd
          show={showDelivery}
          onClose={() => setShowDelivery(false)} 
          onSave={handleAddDelivery}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Pages;
