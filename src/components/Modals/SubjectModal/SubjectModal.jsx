import React, { useState, useEffect, useContext } from 'react';
import DeleteModal from "./SubjectDeleteModal.jsx"
import EditModal from './EditModal.js';
import AddSubjectModal from './AddSubject.jsx';
import { Loader } from '../../Loaders';
import toast from 'react-hot-toast';
import { call } from '../../../utils/helper.js';
import { AppContext } from '../../../context/index.js';

const SubjectModal = ({ closeModal, dept }) => {
  const { user } = useContext(AppContext);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [subjects, setSubjects] = useState([
    // { Subject_name: 'Biochemistry' },
    // { Subject_name: 'BioTechnology' },
    // { Subject_name: 'Mathematics' },
  ]);

  const handleDelete = (subject) => {
    setCurrentDepartment(subject);
    setShowDeleteModal(true);
    setButtonLoader(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setButtonLoader(false);
  };

  const handleEditOpen = (subject) => {
    setCurrentDepartment(subject);
    setShowEditModal(true);
    setButtonLoader(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentDepartment(null);
    setButtonLoader(false);
  };


  const openAddModal = () => {
    setButtonLoader(false);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addDepartment = async (newDepartment) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('user_id', user?.user_id)
      formData.append('institute_id', dept?.institute_id)
      formData.append('subject_name', newDepartment)
      // formData.append('department_semester', newSemester)
      const response = await call('/admin/create_subject', 'POST', formData)
      await getList()
      closeAddModal()
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };

  const handleEdit = async (originalName, newName) => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('institute_subject_id', currentDepartment?.institute_subject_id)
      formData.append('subject_name', newName)
      // formData.append('department_semester', newSemester)
      console.log('formData', formData)
      const response = await call('/admin/edit_subject', 'POST', formData)
      await getList()
      closeEditModal()
      setShowAddModal(false);
      setButtonLoader(false);
      toast.success(response?.message, { duration: 2000 })
    } catch (error) {
      setButtonLoader(false);
      toast.success(error?.message, { duration: 2000 })
    }
  };


  const deleteDepartment = async () => {
    try {
      setButtonLoader(true)
      const formData = new FormData()
      formData.append('institute_subject_id', currentDepartment?.institute_subject_id)
      const response = await call('/admin/delete_subject', 'POST', formData)
      await getList()
      closeDeleteModal();
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
      formData.append('institute_id', dept?.institute_id)
      const response = await call('/admin/fetch_subject_list', 'POST', formData)
      setScreenLoader(false)
      setSubjects(response?.data)
    } catch (error) {
      setScreenLoader(false)
      setSubjects([])
      toast.success(error?.message, { duration: 2000 })
    }
  };

  console.log('dept =>', dept)

  useEffect(() => {
    getList(true)
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
        {screenLoader ? (
          <div className="w-full flex justify-center items-center">
            <Loader extraStyles="!static !bg-transparent" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{dept?.Subject_name}</h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Subject</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border text-center">{subject.subject_name}</td>
                      <td className="px-4 py-2 border flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded-md"
                          onClick={() => handleEditOpen(subject)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => handleDelete(subject)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                className="w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                onClick={openAddModal}
              >
                + Add Subject
              </button>
              <button
                className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <DeleteModal
          confirmModal={deleteDepartment}
          isLoading={buttonLoader}
          delete_name={currentDepartment?.subject_name}
          closeModal={closeDeleteModal}
        />
      )}
      {showEditModal && (
        <EditModal
          isLoading={buttonLoader}
          isOpen={showEditModal}
          onClose={closeEditModal}
          onSave={handleEdit}
          dept={currentDepartment}
        />
      )}
      {showAddModal && (
        <AddSubjectModal
          isLoading={buttonLoader}
          isOpen={showAddModal}
          closeModal={closeAddModal}
          addDepartment={addDepartment}
        />
      )}
    </div>
  );
};

export default SubjectModal;
