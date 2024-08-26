import React, { useState, useEffect } from 'react';

const EditSubjectModal = ({ isOpen, onClose, dept, onSave, isLoading }) => {
    const [newSubject, setNewSubject] = useState(dept?.subject_name);
  
    const handleSave = () => {
        onSave(dept.subject_name, newSubject);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h3 className="text-xl font-semibold mb-4">Edit Subject</h3>
                <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    placeholder="Subject name"
                />
                {/* <input
                    type="number"
                    value={newSemester}
                    onChange={(e) => setNewSemester(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md mb-4"
                    placeholder="Department semester"
                /> */}
                <div className="flex space-x-2 mt-2">
                    <button
                        className={`w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center ${isLoading ? 'opacity-50' : 'opacity-100'}`}
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Load' : 'Save'}
                    </button>
                    <button
                        className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSubjectModal;
