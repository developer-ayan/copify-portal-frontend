import React, { useEffect, useState } from "react";
import { base_url } from "../utils/url";
import { Loader, Page } from "../components";
import Slidbar from "../components/BranchChat/BranchSidebar"
import ChatWindow from "../components/BranchChat/BranchChatWindow";



const BranchChat = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([
      { id: 1, name: 'Nancy Fernandez', lastMessage: "I'm good, how about you?" },
      { id: 2, name: 'Jonathan Griffin', lastMessage: '' },
      { id: 3, name: 'Gertrude Weber', lastMessage: '' },
      { id: 4, name: 'Ophelia George', lastMessage: '' },
      { id: 5, name: 'Louis Bryan', lastMessage: '' },
      { id: 6, name: 'Evan Pearson', lastMessage: '' },
    ]);
  
    const [selectedUser, setSelectedUser] = useState(users[0]);
  
    const updateUserMessage = (userId, message) => {
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId ? { ...u, lastMessage: `You: ${message}` } : u
        )
      );
    };

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
        <Slidbar  users={users} onUserSelect={setSelectedUser} />
      </div>

     
      <div className="flex-1">
        <ChatWindow user={selectedUser} updateUserMessage={updateUserMessage}/>
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
