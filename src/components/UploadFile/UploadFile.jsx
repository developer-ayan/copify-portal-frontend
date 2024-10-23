import React from 'react';

const UploadFile = ({ fileName, setFileName, file, setFile }) => {

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        console.log('selectedFile', selectedFile)
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (validExtensions.includes(fileExtension)) {
            // Set the file and fileName regardless of the extension
            setFile(selectedFile);
            setFileName(selectedFile.name);
        } else {
            alert('Invalid file type. Please upload a picture.');
        }
    };


    return (
        <div>
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
                        {fileName && (
                            <p className="mt-2 text-sm text-gray-500">
                                {fileName} {file ? `(${(file.size / 1024).toFixed(2)} KB)` : ""}
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
        </div>
    );
};

export default UploadFile;