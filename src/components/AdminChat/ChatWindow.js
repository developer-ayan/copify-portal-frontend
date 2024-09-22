import React, { useContext, useEffect, useState } from 'react';
import { call } from '../../utils/helper';
import toast from 'react-hot-toast';
import { AppContext } from '../../context';
import NotFound from '../Error/NotFound';
import { Loader } from '../Loaders';

function ChatWindow({ user, updateUserMessage }) {
  const data = useContext(AppContext);
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageLoader, setMessageLoader] = useState(false);



  const getList = async (listLoader) => {
    try {
      listLoader && setLoading(true)
      const formData = new FormData()
      formData.append('user_id', (data?.user?.user_id).toString());
      formData.append('opposite_user_id', user?.user_id_1 == data?.user?.user_id ? user?.user_id_2 : user?.user_id_1);
      const response = await call('/admin/fetch_messages_list', 'POST', formData)
      // setMessages([])
      setMessages(response?.data)
      setLoading(false)
    } catch (error) {
      setMessages([])
      setLoading(false)
      toast.error(error?.message, { duration: 2000 })
    }
  };

  const sendMessage = async () => {
    setMessageLoader(true)
    await updateUserMessage((data?.user?.user_id).toString(), user?.user_id_1 == data?.user?.user_id ? user?.user_id_2 : user?.user_id_1, newMessage, setNewMessage, getList);
    setMessageLoader(false)
  };

  useEffect(() => {
    getList(true)
  }, [user])

  console.log('message  =====.', messages, user, user?.user_id_1 == data?.user?.user_id ? user?.user_id_2 : user?.user_id_1)

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-2 border-b border-gray-300">
        <h2 className="text-md font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">Now you can have a conversation here.</p>
      </div>

      {loading ?
        <div className="flex-1 p-9 overflow-y-auto">
          <Loader extraStyles="!static !bg-transparent" />
        </div>
        :
        <div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages?.length > 0 ?
              messages.map((message, index) => {
                console.log('message', message)
                return (
                  <div key={index} className={`mb-4 ${message.user_id == data?.user?.user_id ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-md shadow-md ${message.user_id == data?.user?.user_id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.message}
                    </div>
                  </div>
                )
              }) :
              <div className="flex flex-col justify-center items-center h-full">
                <NotFound removeBorder={true} text={'There are no messages!'} />
              </div>
            }
          </div>

          <div className="p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg mr-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${messageLoader ? 'opacity-50' : 'opacity-100'}`}
            >
              {messageLoader ? "Load" : "Send"}
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default ChatWindow;
