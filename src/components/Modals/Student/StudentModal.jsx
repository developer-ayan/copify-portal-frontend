import React, { useState } from 'react';

const StudentModal = ({ closeModal }) => {
  const [students, setStudents] = useState([
    { id: 1, studentName: 'Jennifer Smith', claimCode: 'CDK000001' },
    { id: 2, studentName: 'Jane Smith', claimCode: 'CDK000002' },
   
  ]);

  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-6">
      <div className="bg-white p-6 shadow-md w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Student</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Claim Code</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2 border text-center">{student.studentName}</td>
                  <td className="px-4 py-2 border text-center">{student.claimCode}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-2 mt-4">
        
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
