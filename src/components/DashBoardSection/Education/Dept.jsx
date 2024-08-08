import React, { useContext, useEffect, useState } from 'react';
import DeleteModal from '../../Modals/DeleteModal';
import ViewModal from '../../Modals/ViewModal';
import UploadModal from '../../Modals/AddInstitute';
import EditInstituteModal from '../../Modals/EducationEdit';
import { AppContext } from '../../../context';
import toast from 'react-hot-toast';
import { call } from '../../../utils/helper';
import { Loader } from '../../Loaders';

const Order = () => {
  const { user } = useContext(AppContext);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentDept, setCurrentDept] = useState(null);
  const [uploads, setUploads] = useState([
    // { name: 'School', location: 'Gulshan-e-Iqbal', status: "" },
    // { name: 'College', location: 'Saddar', status: "" },
    // { name: 'University', location: 'Jamshed Road', status: "" },
  ]);

  const addUpload = async (name, location) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('institute_name', name)
      formData.append('institute_location', location)
      console.log('formData', formData)
      const response = await call('/admin/create_institute', 'POST', formData)
      getList()
      setShowUploadModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setScreenLoader(true)
      const formData = new FormData()
      console.log('formData', formData)
      const response = await call('/admin/fetch_institute_list', 'POST', formData)
      setScreenLoader(false)
      setUploads(response?.data)
    } catch (error) {
      setScreenLoader(false)
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const deleteUpload = (name) => {
    setUploads(uploads.filter(upload => upload.name !== name));
    setShowDeleteModal(false);
  };

  const handleEdit = (institute) => {
    setCurrentDept(institute);
    setShowEditModal(true);
  };

  const saveEdit = (originalName, newName, newLocation) => {
    setUploads(uploads.map(upload =>
      upload.name === originalName
        ? { ...upload, name: newName, location: newLocation }
        : upload
    ));
    setShowEditModal(false);
  };

  useEffect(() => {
    getList(true)
  }, [])

  return screenLoader ? <div className="w-full flex justify-center items-center min-h-[90vh]">
    <Loader extraStyles="!static !bg-transparent" />
  </div> : (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 md:mx-8 lg:mx-7">
      <div className="w-full mb-4 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Institute</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setShowUploadModal(true)}
          >
            + Add Institute
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Institute Name</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{upload.institute_name}</td>
                  <td className="px-4 py-2 border text-center">{upload.institute_location}</td>
                  <td className="px-4 py-2 border flex space-x-2 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => { setCurrentDept(upload.name); setShowViewModal(true); }}
                    >
                      Depatment
                    </button>
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(upload)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => { setCurrentDept(upload.name); setShowDeleteModal(true); }}
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

      {showUploadModal && (
        <UploadModal
          show={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSave={addUpload}
          isLoading={buttonLoader}
        />
      )}

      {showDeleteModal && (
        <DeleteModal closeModal={() => setShowDeleteModal(false)}>
          {/* Add delete logic here */}
        </DeleteModal>
      )}

      {showViewModal && (
        <ViewModal
          institutes={uploads}
          closeModal={() => setShowViewModal(false)}
        />
      )}

      {showEditModal && (
        <EditInstituteModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={saveEdit}
          currentInstitute={currentDept}
        />
      )}
    </div>
  );
};

export default Order;
