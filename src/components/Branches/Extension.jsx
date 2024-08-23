import React, { useContext, useEffect, useState } from 'react';
import ShopDeleteModal from '../Branches/BranchesModal/BranchesDeleteModal';
import AddShopModal from '../Branches/ExtensionModal/AddExtension';
import ShopEditModal from '../Branches/ExtensionModal/EditExtension';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { Loader } from '../Loaders';

const Branches = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [uploads, setUploads] = useState([]);
  
  const handleAddShop = (image, description) => {
    const newShop = {
      image,
      description,
    };
    setUploads([...uploads, newShop]);
    setShowAddShopModal(false);
    toast.success('Branch added successfully', { duration: 2000 });
  };

  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload !== currentDept));
    setShowDeleteModal(false);
    toast.success('Branch deleted successfully', { duration: 2000 });
  };

  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true);
  };

  const saveEdit = (originalImage, newImage, newDescription) => {
    setUploads(
      uploads.map((upload) =>
        upload.image === originalImage
          ? { ...upload, image: newImage, description: newDescription }
          : upload
      )
    );
    setShowEditModal(false);
    toast.success('Branch updated successfully', { duration: 2000 });
  };

  useEffect(() => {
    setScreenLoader(false);
  }, []);

  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 mt-7 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Extension</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Add Extension
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">
                    <img src={upload.image} alt="Branch Image" className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-4 py-2 border text-center">{upload.description}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => {
                        setCurrentDept(upload);
                        setShowDeleteModal(true);
                      }}
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

      {showAddShopModal && (
        <AddShopModal
          show={showAddShopModal}
          onClose={() => setShowAddShopModal(false)}
          onSave={handleAddShop}
          isLoading={buttonLoader}
        />
      )}

      {showDeleteModal && (
        <ShopDeleteModal 
          isLoading={buttonLoader} 
          delete_name={currentDept?.description} 
          confirmModal={deleteShop} 
          closeModal={() => setShowDeleteModal(false)} 
        />
      )}

      {showEditModal && (
        <ShopEditModal
          isLoading={buttonLoader}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveEdit}
          currentBranch={currentDept}
        />
      )}
    </div>
  );
};

export default Branches;
