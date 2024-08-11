import React, { useContext, useEffect, useState } from 'react';
import ShopDeleteModal from '../Shop/ShopModal/ShopDeleteModal';
import AddShopModal from '../Shop/ShopModal/AddShopModal';
import ShopEditModal from '../Shop/ShopModal/ShopEditModal';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { Loader } from '../Loaders';

const Shop = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [uploads, setUploads] = useState([
    // { shop_name: 'School', shop_address: 'Gulshan-e-Iqbal', status: "" },
    // { shop_name: 'College', shop_address: 'Saddar', status: "" },
    // { shop_name: 'University', shop_address: 'Jamshed Road', status: "" },
  ]);


  const handleAddShop = (name, address) => {
    const newShop = {
      shop_name: name,
      shop_address: address,
      status: "",
    };
    setUploads([...uploads, newShop]);
    setShowAddShopModal(false);
    toast.success('Institute added successfully', { duration: 2000 });
  };

  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload.shop_name !== currentDept?.shop_name));
    setShowDeleteModal(false);
    toast.success('Institute deleted successfully', { duration: 2000 });
  };

  const handleEdit = (shop) => {
    setCurrentDept(shop);
    setShowEditModal(true);
  };

  const saveEdit = (originalName, newName, newAddress) => {
    setUploads(uploads.map(upload =>
      upload.shop_name === originalName
        ? { ...upload, shop_name: newName, shop_address: newAddress }
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
          <h2 className="text-2xl font-bold">Shop</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Add Shop
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Shop Name</th>
                <th className="px-4 py-2 border">Shop Address</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.shop_name}</td>
                  <td className="px-4 py-2 border text-center">{upload.shop_address}</td>
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
          onSave={handleAddShop}  // Use the renamed function here
          isLoading={buttonLoader}
        />
      )}

      {showDeleteModal && (
        <ShopDeleteModal isLoading={buttonLoader} delete_name={currentDept?.shop_name} confirmModal={() => deleteShop()} closeModal={() => setShowDeleteModal(false)} />
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

export default Shop;
