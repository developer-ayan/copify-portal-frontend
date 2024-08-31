import React, { useContext, useEffect, useState } from 'react';
import AddSubscriptionModal from '../SubscriptionModal/AddSubscription';
import EditSubscriptionModal from '../SubscriptionModal/EditSubcription'; 
import DeleteSubscriptionModal from '../SubscriptionModal/DeletSubscription'; 
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';

const Subscription = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(null);
  const [uploads, setUploads] = useState([]);

  const handleAddShop = (php, months) => {
    const newPromo = {
      php,
      months,
      status: "",
    };
    setUploads([...uploads, newPromo]);
    setShowAddShopModal(false);
    toast.success('Subscription added successfully', { duration: 2000 });
  };

  const handleEdit = (promo) => {
    setCurrentPromo(promo);
    setShowEditModal(true);
  };

  const saveEdit = (newPhp, newMonths) => {
    setUploads(uploads.map(upload =>
      upload === currentPromo
        ? { ...upload, php: newPhp, months: newMonths }
        : upload
    ));
    setShowEditModal(false);
    toast.success('Subscription updated successfully', { duration: 2000 });
  };

  const deleteShop = () => {
    setUploads(uploads.filter(upload => upload !== currentPromo));
    setShowDeleteModal(false);
    toast.success('Subscription deleted successfully', { duration: 2000 });
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
          <h2 className="text-2xl font-bold">Subscription</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Add Subscription
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">PHP</th>
                <th className="px-4 py-2 border">Months</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.php}</td>
                  <td className="px-4 py-2 border text-center">{upload.months}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => { setCurrentPromo(upload); setShowDeleteModal(true); }}
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
        <DeleteSubscriptionModal
          isLoading={buttonLoader}
          delete_name={currentPromo?.plan}
          confirmModal={deleteShop}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}


      {showAddShopModal && (
        <AddSubscriptionModal
          isOpen={showAddShopModal}
          closeModal={() => setShowAddShopModal(false)}
          addDepartment={handleAddShop}
          isLoading={buttonLoader}
        />
      )}


      {showEditModal && (
        <EditSubscriptionModal
          isOpen={showEditModal}
          closeModal={() => setShowEditModal(false)}
          updateDepartment={saveEdit}
          initialPhp={currentPromo?.php}
          initialMonths={currentPromo?.months}
          isLoading={buttonLoader}
        />
      )}
    </div>
  );
};

export default Subscription;
