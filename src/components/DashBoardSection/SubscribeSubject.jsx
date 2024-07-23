// SubscribeSection.js
import React, { useState } from 'react';
import Modal from '../Modals/Modal';


const SubscribeSection = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [unsubscribeSubject, setUnsubscribeSubject] = useState('');

  const subjects = [
    "Bio203 - Section B",
    "Mktg102 - Section A",
    "Mktg112 - Section C",
    "Acct101 - Section B",
    "Psch101 - Section D",
  ];

  const handleChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleUnsubscribe = (subject) => {
    setUnsubscribeSubject(subject);
    setShowAlert(true);
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  return (
//     <div className="bg-white p-5 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Subscribe Subject</h2>
      
//       <div>
//         {subjects.map((subject, index) => (
//           <div key={index} className="flex justify-between items-center mb-4">
//             <div className="flex items-center">
//               <input
//                 type="radio"
//                 id={`subscribe-${index}`}
//                 name="subscribe"
//                 value={subject}
//                 checked={selectedSubject === subject}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               <label htmlFor={`subscribe-${index}`} className="mr-4">{subject}</label>
//             </div>
//             <span className="flex items-center mb-4">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 onClick={() => handleUnsubscribe(subject)}
//               >
//                 Unsubscribe
//               </button>
//             </span>
//           </div>
//         ))}
//       </div>

//       {showAlert && (
//         <Modal unsubscribeSubject={unsubscribeSubject} closeModal={closeModal} />
//       )}
//     </div>
//   );
// };
<div className="bg-white p-5 rounded-lg text-center shadow-md ">
<h2 className="text-2xl font-semibold mb-4 text-left">Subscribe Subject</h2>
<div className="overflow-x-auto">
  <table className="min-w-full bg-white">
    <thead>
      <tr>
        
        <th className="py-2 px-4 border-b text-left">Subject</th>
        
        <th className="py-2 px-4 border-b">Action</th>
      </tr>
    </thead>
    <tbody>
      {subjects.map((subject,index) => (
        <tr key={index}>
          <td className="px-4 py-2 border ">
            <div className="flex items-center  ">
          
              <input
                type="radio"
                                id={`subscribe-${index}`}
                                name="subscribe"
                                value={subject}
                                checked={selectedSubject === subject}
                                onChange={handleChange}
                                className="mr-2"
                              />
                              
              
              <label htmlFor={`subscribe-${index}`} className="mr-4">{subject}</label>
            </div>
          </td>
          <td className="py-2 px-4 border-b text-center">
          {/* <span className="py-2 px-4 border-b text-center"> */}
           <button
                className="bg-blue-500 text-white px-4 py-2 rounded "
                onClick={() => handleUnsubscribe(subject)}
              >
                Unsubscribe
              </button>
            {/* </span> */}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{showAlert && (
          <Modal unsubscribeSubject={unsubscribeSubject} closeModal={closeModal} />
        )}
</div>



    
);
};
export default SubscribeSection;
