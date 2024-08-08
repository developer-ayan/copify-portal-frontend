import React, { useState } from 'react';
import DeleteModal from '../../components/Modals/DeleteModal';
import EditInstituteModal from '../../components/Modals//EducationEdit';
import AddDepartmentModal from '../../components/Modals/addDepart';

const ViewInstitutesModal = ({ closeModal }) => {
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [currentInstitute, setCurrentInstitute] = useState(null);
  const [departments, setDepartments] = useState([
    { name: 'Department of Biochemistry' },
    { name: 'Department of BioTechnology'},
    { name: 'Department of Mathematics'  },
  ]);

  const handleSelection = (institute) => {
    setSelectedInstitute(institute);
  };

  const handleDelete = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDepartmentToDelete(null);
  };

  const handleEdit = (institute) => {
    setCurrentInstitute(institute);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentInstitute(null);
  };

  const handleSave = (originalName, newName, newLocation) => {
    setDepartments(departments.map(department =>
      department.name === originalName
        ? { ...department, name: newName, location: newLocation }
        : department
    ));
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addDepartment = (newDepartmentName) => {
    setDepartments([...departments, { name: newDepartmentName, location: '' }]);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Departments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{department.name}</td>
                  <td className="px-4 py-2 border flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 justify-center">
                    <button
                      className="px-3 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => handleEdit(department)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(department)}
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
            + Add Department
          </button>
          <button
            className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteModal dept={departmentToDelete} closeModal={closeDeleteModal} />
      )}
      {showEditModal && (
        <EditInstituteModal
          show={showEditModal}
          onClose={closeEditModal}
          onSave={handleSave}
          currentInstitute={currentInstitute}
        />
      )}
      {showAddModal && (
        <AddDepartmentModal
          isOpen={showAddModal}
          closeModal={closeAddModal}
          addDepartment={addDepartment}
        />
      )}
    </div>
  );
};

export default ViewInstitutesModal;
