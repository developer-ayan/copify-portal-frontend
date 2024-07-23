import React, { useState } from 'react';

const UploadModal = ({ show, onClose, onSave }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [number, setNumber] = useState('');
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validExtensions = ['.doc', '.docx', '.pdf', '.txt', '.ppt'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (validExtensions.includes(`.${fileExtension}`)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Invalid file type. Please upload a document.');
    }
  };

  const handleSave = () => {
    if (file && documentType && description) {
      onSave(documentType, fileName, file, description);
      onClose();
    } else {
      alert('Please select a file, a document type, and provide a description.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-blue-500 w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 overflow-y-auto max-h-screen">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">Upload Document</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="mb-2">
            <label
              htmlFor="file"
              className="block w-full text-center py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
            >
              <div className="flex flex-col items-center justify-center">
                <svg className="w-10 h-10 mb-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 5C12.5128 5 12.9355 5.38604 12.9933 5.88338L13 6V12.5858L14.2929 11.2929C14.6534 10.9324 15.2206 10.9047 15.6129 11.2097L15.7071 11.2929C16.0676 11.6534 16.0953 12.2206 15.7903 12.6129L15.7071 12.7071L12.7071 15.7071C12.3466 16.0676 11.7794 16.0953 11.3871 15.7903L11.2929 15.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.65338 10.9324 9.22061 10.9047 9.6129 11.2097L9.70711 11.2929L11 12.5858V6C11 5.44772 11.4477 5 12 5ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"></path>
                </svg>
                <p className="text-gray-600 text-sm">
                  Drag document here or <span className="text-blue-500 underline">browse</span>
                </p>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    {fileName} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <select
              id="documentType"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select document type</option>
              <option value="English">English</option>
              <option value="Maths">Maths</option>
              <option value="Science">Science</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-2">
            <input
              id="description"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input type="number" 
            id="number-input" 
            aria-describedby="helper-text-explanation"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             placeholder="1" required />
          </div>
          <div className="mb-2">
            <select
              id="pageSize"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Page size</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-2">
            <select
              id="colorStatus"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Color Status</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="color">Color</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-2">
          <input type="Total price" 
            id="number-input" 
            aria-describedby="helper-text-explanation"
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             placeholder="Total price" required />
          </div>
          <div className="flex justify-center space-x-2">
            <button
              onClick={handleSave}
              className="w-6/12 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="w-6/12 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
