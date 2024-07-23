import React from 'react';

const SuboptionsRadio = ({ file, selectedSubject, onChange, onUnsubscribe }) => {
  const handleChange = () => {
    onChange(file.id);
  };

  return (
    <>
      <tr>
        <td className="px-4 py-2 border">
          <div className="flex items-center">
            <input
              type="radio"
              id={`subscribe-${file.id}`}
              name="subscribe"
              value={file.id}
              checked={selectedSubject === file.id}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={`subscribe-${file.id}`} className="mr-4">{file.subject}</label>
          </div>
          {selectedSubject === file.id && (
            <div className="ml-6 mt-2">
              {file.subject === 'Bio203 - Section B' ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <input
                        type="radio"
                        id={`sub-option-1-${file.id}`}
                        name={`sub-option-${file.id}`}
                        className="mr-2"
                      />
                      <label htmlFor={`sub-option-1-${file.id}`} className="mr-4">Module 2, 10 pages, 2 copies</label>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-4 rounded ml-4"
                    >
                      Receive
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <input
                        type="radio"
                        id={`sub-option-2-${file.id}`}
                        name={`sub-option-${file.id}`}
                        className="mr-2"
                      />
                      <label htmlFor={`sub-option-2-${file.id}`} className="mr-4">Theory of Life, 8 pages, 1 copy</label>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-4 py-4 rounded mb-2"
                    >
                      Receive
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <input
                      type="radio"
                      id={`sub-option-1-${file.id}`}
                      name={`sub-option-${file.id}`}
                      className="mr-2"
                    />
                    <label htmlFor={`sub-option-1-${file.id}`} className="mr-4">Case Study 1, 2 pages, 1 copy</label>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                  >
                    Receive
                  </button>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default SuboptionsRadio;
