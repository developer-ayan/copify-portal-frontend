import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ShopDeleteModal from '../Branches/BranchesModal/BranchesDeleteModal';
import AddShopModal from '../Branches/BranchesModal/AddBranchesModal';
import ShopEditModal from '../Branches/BranchesModal/BranchesEditModal';
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
  const [showPassword, setShowPassword] = useState({}); 
  
  const togglePasswordVisibility = (index) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAddShop = (name, email, location, password) => {
    const newShop = {
      name,
      email,
      location,
      password,
      status: "",
    };
    setUploads([...uploads, newShop]);
    setShowAddShopModal(false);
    toast.success('Institute added successfully', { duration: 2000 });
  };

  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload.email !== currentDept?.email));
    setShowDeleteModal(false);
    toast.success('Institute deleted successfully', { duration: 2000 });
  };

  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true);
  };

  const saveEdit = (originalEmail, newName, newEmail, newLocation, newPassword) => {
    setUploads(uploads.map(upload =>
      upload.email === originalEmail
        ? { ...upload, name: newName, email: newEmail, location: newLocation, password: newPassword }
        : upload
    ));
    setShowEditModal(false);
    toast.success('Institute updated successfully', { duration: 2000 });
  };

  useEffect(() => {
    setScreenLoader(false);
  }, []);

  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Branches</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Add Branch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Password</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.name}</td>
                  <td className="px-4 py-2 border text-center">{upload.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center items-center">
                      <span>
                        {showPassword[index]
                          ? upload.password
                          : "*".repeat(upload.password.length)}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(index)}
                        className="ml-2 text-blue-500"
                      >
                        {showPassword[index] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 border text-center">{upload.location}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)}
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
          delete_name={currentDept?.email} 
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
          currentInstitute={currentDept}
        />
      )}
    </div>
  );
};

export default Branches;
