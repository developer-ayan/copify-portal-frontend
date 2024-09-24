import React, { useContext, useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import Slidbar from "../components/AdminChat/Sidebar"
import ChatWindow from "../components/AdminChat/ChatWindow";
import toast from "react-hot-toast";
import { call } from "../utils/helper";
import { AppContext } from "../context";



const BranchChat = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AppContext);

  const [users, setUsers] = useState([
    // { id: 1, name: 'Nancy Fernandez', lastMessage: "I'm good, how about you?" },
    // { id: 2, name: 'Jonathan Griffin', lastMessage: '' },
    // { id: 3, name: 'Gertrude Weber', lastMessage: '' },
    // { id: 4, name: 'Ophelia George', lastMessage: '' },
    // { id: 5, name: 'Louis Bryan', lastMessage: '' },
    // { id: 6, name: 'Evan Pearson', lastMessage: '' },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);


  const updateUserMessage = async (user_id, opposite_user_id, message, setMessage, getMessages) => {
    try {
      const formData = new FormData()
      formData.append('user_id', user_id);
      formData.append('opposite_user_id', opposite_user_id);
      formData.append('message', message);
      const response = await call('/admin/send_message', 'POST', formData)
      await Promise.all([
        getList(),
        getMessages(),
        setMessage('')
      ])
      return 1
    } catch (error) {
      toast.error(error?.message, { duration: 2000 })
      return 0
    }
  };

  const getList = async (listLoader) => {
    try {
      listLoader && setIsLoading(true)
      const formData = new FormData()
      formData.append('user_id', (user?.user_id).toString());
      const response = await call('/admin/fetch_inbox_list', 'POST', formData)
      setUsers(response?.data)
      setSelectedUser(selectedUser || response?.data[0])
      setIsLoading(false)
    } catch (error) {
      setUsers([])
      setIsLoading(false)
      toast.error(error?.message, { duration: 2000 })
    }
  };

  useEffect(() => {
    getList(true)
  }, [user])

  return (
    <Page
      title="Collegio de Kidapawan Branch"
      containerStyles={`relative !bg-[#EEF2F5] !p-0`}
      headerStyles="px-5 !m-0 !py-2 bg-white"
      enableHeader
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          {isLoading ? (
            <div className="w-full flex justify-center items-center min-h-[20vh]">
              <Loader extraStyles="!static !bg-transparent" />
            </div>
          ) : (
            <main className="p-8">
              <div className="flex h-screen">

                <div className="w-1/4">
                  <Slidbar users={users} onUserSelect={setSelectedUser} />
                </div>


                <div className="flex-1">
                  {users?.length > 0 ?
                    <ChatWindow user={selectedUser} updateUserMessage={updateUserMessage} />
                    : <></>
                  }
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </Page>
  );
};

export default BranchChat;
