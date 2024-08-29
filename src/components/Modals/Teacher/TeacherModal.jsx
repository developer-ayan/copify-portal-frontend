import React, { useState } from 'react';

const TeacherModal = ({ closeModal }) => {
  const [teachers, setTeachers] = useState([
    { id: 1, TeacherName: 'Jennifer Smith', claimCode: 'CDK000001' },
    { id: 2, TeacherName: 'Jane Smith', claimCode: 'CDK000002' },
  ]);

  const handleDelete = (id) => {
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id);
    setTeachers(updatedTeachers);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Teacher Information</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Teacher Name</th>
                <th className="px-4 py-2 border">Claim Code</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-4 py-2 border text-center">{teacher.TeacherName}</td>
                  <td className="px-4 py-2 border text-center">{teacher.claimCode}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(teacher.id)}
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
    </div>
  );
};

export default TeacherModal;
