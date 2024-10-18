import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ShopDeleteModal from '../Branches/BranchesModal/BranchesDeleteModal';
import AddShopModal from '../Branches/BranchesModal/AddBranchesModal';
import ShopEditModal from '../Branches/BranchesModal/BranchesEditModal';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { Loader } from '../Loaders';
import { call } from '../../utils/helper';

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

  const handleAddShop = async (name, email, branch_address, password , file) => {
    console.log("name, email, branch_address, password , file" , name, email, branch_address, password , file)
    try {
      setButtonLoader(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('password', password);
      formData.append('branch_address', branch_address);
      formData.append('file_upload', file);
      formData.append('role_id', "2");
      const response = await call('/admin/create_branch', 'POST', formData);
      await getBranches()
      setButtonLoader(false)
      setShowAddShopModal(false)
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setButtonLoader(false)
      toast.error(error?.message, { duration: 2000 });
    }
  };


  const deleteShop = async () => {
    try {
      setButtonLoader(true)
      const formData = new FormData();
      formData.append('user_id', currentDept?.user_id);
      const response = await call('/admin/delete_user', 'POST', formData);
      await getBranches()
      setButtonLoader(false)
      setShowDeleteModal(false)
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setButtonLoader(false)
      toast.error(error?.message, { duration: 2000 });
    }
  };

  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true);
  };

  const saveEdit = async (originalEmail, newName, newEmail, newLocation, newPassword , file) => {
    try {
      setButtonLoader(true)
      const formData = new FormData();
      formData.append('user_id', currentDept?.user_id);
      formData.append('email', newEmail);
      formData.append('name', newName);
      formData.append('password', newPassword);
      formData.append('branch_address', newLocation);
      formData.append('file_upload', file);
      formData.append('role_id', "2");
      const response = await call('/admin/edit_branch', 'POST', formData);
      await getBranches()
      setButtonLoader(false)
      setShowEditModal(false)
      toast.success(response?.message, { duration: 2000 });
    } catch (error) {
      setButtonLoader(false)
      toast.error(error?.message, { duration: 2000 });
    }
  };

  // useEffect(() => {
  //   setScreenLoader(false);
  // }, []);

  const getBranches = async (loading) => {
    try {
      loading && setScreenLoader(true);
      const formData = new FormData();
      const response = await call('/admin/fetch_branch_list', 'POST', formData);
      setUploads(response?.data);
      loading && setScreenLoader(false);
    } catch (error) {
      setUploads([]);
      toast.error(error?.message, { duration: 2000 });
      loading && setScreenLoader(false);
    }
  };

  const fetchAPIs = async () => {
    await getBranches(true)

  };

  useEffect(() => {
    fetchAPIs()
  }, [])

  console.log('branches ', uploads)

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
                {/* <th className="px-4 py-2 border">Password</th> */}
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.name}</td>
                  <td className="px-4 py-2 border text-center">{upload.email}</td>
                  {/* <td className="px-4 py-2 border text-center">
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
                  </td> */}
                  <td className="px-4 py-2 border text-center">{upload.branch_address}</td>
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
