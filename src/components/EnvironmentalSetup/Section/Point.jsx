import React, { useContext, useEffect, useState } from 'react';
import AddPointModal from '../PointsModal/AddPoints';
import EditPointModal from '../PointsModal/EditModal';
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { Loader } from '../../Loaders';

const Point = () => {
  const { user } = useContext(AppContext);
  const [showAddShopModal, setShowAddShopModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [currentPromo, setCurrentPromo] = useState(null); 
  const [uploads, setUploads] = useState([]);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  
  const handleAddPoints = (points, php) => { 
    const newPromo = {
      points,
      php,
      status: "",
    };
    setUploads([...uploads, newPromo]);
    setShowAddShopModal(false);
    toast.success('Points added successfully', { duration: 2000 });
  };

  const handleEdit = (promo) => {
    setCurrentPromo(promo);
    setShowEditModal(true); 
  };

  const saveEdit = (originalPoints, newPoints, newPhp) => {
    setUploads(uploads.map(upload =>
      upload.points === originalPoints
        ? { ...upload, points: newPoints, php: newPhp }
        : upload
    ));
    setShowEditModal(false); 
    toast.success('Points updated successfully', { duration: 2000 });
  };

  useEffect(() => {
    setScreenLoader(false);
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
    setIsTableExpanded(!isTableExpanded);
  
  }
  return screenLoader ? (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      <Loader extraStyles="!static !bg-transparent" />
    </div>
  ) : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 mt-7 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Points</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowAddShopModal(true)}
          >
            + Add Points
          </button>
        </div>
        <div
  className="flex justify-between items-center cursor-pointer mb-4"
  onClick={toggleDropdown}
>
  <span
    className={`transform transition-transform duration-200 ml-auto ${
      isDropdownOpen ? 'rotate-180' : 'rotate-0'
    }`}
  >
    ▼
  </span>
</div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Points</th>
                <th className="px-4 py-2 border">PHP</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}  className={`${isTableExpanded ? '' : 'hidden'} mt-4 overflow-x-auto`}>
                  <td className="px-4 py-2 border text-center">{upload.points}</td>
                  <td className="px-4 py-2 border text-center">{upload.php}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)} 
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

      {showAddShopModal && (
        <AddPointModal
          isOpen={showAddShopModal}
          closeModal={() => setShowAddShopModal(false)}
          handleAddPoints={handleAddPoints}  
          isLoading={buttonLoader}
        />
      )}

      {showEditModal && (
        <EditPointModal
          isOpen={showEditModal}
          closeModal={() => setShowEditModal(false)}
          onSave={saveEdit}
          currentPromo={currentPromo}
          isLoading={buttonLoader}
        />
      )}
    </div>
  );
};

export default Point;
