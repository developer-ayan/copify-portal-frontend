import React, { useState, useEffect } from 'react';
import DeleteModal from './SubjectDeleteModal.jsx';
import EditModal from '../SubjectModal/EditModal.js';
import AddSubjectModal from '../SubjectModal/AddSubject.jsx';
import { Loader } from '../../Loaders';
import toast from 'react-hot-toast';

const SubjectModal = ({ closeModal, dept }) => {
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

  const handleEdit = (originalName, newName) => {
    setSubjects(subjects.map(subject =>
      subject.Subject_name === originalName
        ? { ...subject, Subject_name: newName }
        : subject
    ));
    toast.success('Subject updated successfully!', { duration: 2000 });
    closeEditModal();
  };

  const openAddModal = () => {
    setButtonLoader(false);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addDepartment = (newSubjectName) => {
    setSubjects([...subjects, { Subject_name: newSubjectName }]);
    toast.success('Subject added successfully!', { duration: 2000 });
    closeAddModal();
  };

  const deleteDepartment = () => {
    setSubjects(subjects.filter(subject => subject !== currentDepartment));
    toast.success('Subject deleted successfully!', { duration: 2000 });
    closeDeleteModal();
  };

  useEffect(() => {
    // Simulate fetching data
    setScreenLoader(true);
    setTimeout(() => {
      setScreenLoader(false);
    }, 1000);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
        {screenLoader ? (
          <div className="w-full flex justify-center items-center">
            <Loader extraStyles="!static !bg-transparent" />
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">{dept?.Subject_name}</h3>
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
                      <td className="px-4 py-2 border text-center">{subject.Subject_name}</td>
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
          delete_name={currentDepartment?.Subject_name}
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
