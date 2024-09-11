import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { call } from '../../utils/helper';
import { fileColorDropdown } from '../../constants/data';
import { PDFDocument } from 'pdf-lib';

const UploadModal = ({ show, onClose, onSave, currentDept, publishLater, isLoading }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [paperSize, setPaperSize] = useState('');
  const [paperSizeList, setPaperSizeList] = useState([]);
  const [color, setColor] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');


  const clearStates = () => {
    setFileName('')
    setFile(null)
    setTitle('')
    setDescription('')
    setPageNumber('')
    setPaperSize('')
    setPaperSizeList([])
    setColor('')
    setTotalPrice('')
    setDate('')
    setTime('')
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log('selectedFile', selectedFile)
    const validExtensions = ['doc', 'docx', 'pdf', 'txt', 'ppt']; // Remove the dot
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

    if (validExtensions.includes(fileExtension)) {
      if (fileExtension === 'pdf') { // Use === for comparison
        try {
          const fileBuffer = await selectedFile.arrayBuffer();
          console.log('fileBuffer', fileBuffer)
          const pdfDoc = await PDFDocument.load(fileBuffer);
          const numPages = pdfDoc.getPageCount();
          console.log('numPages:', numPages); // Log the number of pages
          setPageNumber(numPages); // Set the number of pages
          setFile(selectedFile);
          setFileName(selectedFile.name);
        } catch (error) {
          console.error('Error reading PDF file:', error);
          alert('Error reading PDF file. Please try again.');
        }
      }

      // Set the file and fileName regardless of the extension
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Invalid file type. Please upload a document.');
    }
  };

  const getPaperSizes = async () => {
    try {
      const response = await call('/admin/fetch_paper_size_list', 'POST');
      setPaperSizeList(response?.data);
    } catch (error) {
      setPaperSizeList([]);
      toast.error(error?.message, { duration: 2000 });
    }
  };

  useEffect(() => {
    if (show) {
      getPaperSizes();
      clearStates()
    }
  }, [show]); // Fetch paper sizes when the modal is shown

  const handleSave = () => {
    onSave(fileName, file, title, description, pageNumber, paperSize, color, colorReflectPrice(), date, time);
  };

  if (!show) {
    return null;
  }

  const colorReflectPrice = () => {
    const getPrice = paperSizeList?.filter((item, index) => item.paper_size_id == paperSize)?.[0]
    console.log('getPrice', getPrice)
    const colorPrice = color == 1 ? getPrice?.colorful_paper_price : getPrice?.black_and_white_paper_size_price
    console.log('colorPrice', colorPrice)
    const sum = pageNumber * colorPrice
    return sum
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-blue-500 w-full max-w-md mx-auto">
        <div className="bg-white shadow-lg p-4 overflow-y-auto max-h-screen">
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
            <input
              id="title"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
            <input
              id="pagenumber"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Page Number"
              type='number'
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <select
              id="paperSize"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
            >
              <option value="">Paper Size</option>
              {paperSizeList.map((item, index) => (
                <option key={index} value={item.paper_size_id}>
                  {item.paper_size}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <select
              id="colorcode"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">Color status</option>
              {fileColorDropdown.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <input
              id="totalprice"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Total price"
              type='number'
              value={colorReflectPrice()}
              readOnly
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>
          {publishLater ?
            <>
              <div className="mb-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Publish date"
                />
              </div>
              <div className="mb-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Publish time"
                />
              </div>
            </> : <></>
          }


          <div className="flex justify-center space-x-2">
            <button
              onClick={handleSave}
              className={`w-6/12 px-3 ${isLoading ? 'opacity-50' : 'opacity-100'} py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`}
              disabled={isLoading}
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
