import React, { useState } from 'react';
import Layout from '../../layout/page';
import { FaSearch, FaCog, FaComments, FaSnapchat, FaEllipsisV } from 'react-icons/fa';
import { IoMdChatbubbles } from "react-icons/io"; // Importing the icons

// Placeholder data for the chat panel
const chatData = [
  { id: 1, name: 'John Doe', message: 'Hey, how are you?', time: '10:30 AM', avatar: 'https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg', status: 'online' },
  { id: 2, name: 'Jane Smith', message: 'Let\'s catch up later.', time: '09:15 AM', avatar: 'https://i.pinimg.com/736x/0f/fe/06/0ffe063ec2dcaf4145f886804e45d0d8.jpg', status: 'offline' },
  { id: 3, name: 'Sam Wilson', message: 'Good morning!', time: '08:45 AM', avatar: 'https://i.pinimg.com/736x/57/ad/17/57ad1731e21449527950cfe98c68b012.jpg', status: 'online' },
];

const ChatPanel = () => {
  const [selectedChat, setSelectedChat] = useState(chatData[0]); // Default selected chat
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode
  const [searchTerm, setSearchTerm] = useState(""); // State to manage chat search

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Layout>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {/* Left Side: Chat List */}
        <div className={`w-1/3 bg-off-white text-black shadow-xl`}>
          <div className="p-6">
            {/* Settings Bar (Dark Mode and Settings Icon) */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
  <IoMdChatbubbles className="mr-2 text-4xl text-blue-500 " />
  Chat
</h2>

              <div className="flex space-x-4 items-center">
                <FaCog className="cursor-pointer text-orange-600 text-2xl" onClick={toggleDarkMode} />
                <FaEllipsisV className="cursor-pointer text-2xl text-gray-600 hover:text-gray-900 transition duration-300" />
              </div>
            </div>
            {/* Search Bar */}
            <div className="mb-4">
            <div className="flex items-center bg-white p-2 rounded-md shadow-lg">

                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-2 bg-transparent text-gray-500 outline-none"
                />
              </div>
            </div>
            {/* Chat List */}
            <ul>
              {chatData
                .filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((chat) => (
                  <li
                    key={chat.id}
                    className="flex items-center py-4 px-3 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => setSelectedChat(chat)}
                  >
                    <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full mr-2" />
                    <div className={`w-3 h-3 rounded-full ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} mr-4`} />
                    <div>
                      <h3 className="font-medium">{chat.name}</h3>
                      <p className="text-sm text-gray-600">{chat.message}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Chat and Profile */}
        <div className={`w-2/3 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-l shadow-xl`}>
          <div className="p-6">
            {/* Guest Profile */}
            <div className="flex items-center mb-6 border-b pb-4">
              <img src={selectedChat.avatar} alt={selectedChat.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{selectedChat.name}</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} mr-2`} />
                  <p className="text-sm text-gray-500">{selectedChat.status === 'online' ? 'Online' : 'Offline'}</p>
                </div>
                <p className="text-sm text-gray-500">Last active: {selectedChat.time}</p>
              </div>
            </div>

            {/* Chat Window */}
            <div className="h-96 overflow-y-auto mb-4">
              <div className="flex flex-col space-y-4">
                {/* Example Chat Messages */}
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div className="bg-gray-100 p-3 rounded-lg max-w-xs shadow-lg">
                    <p className="text-sm text-gray-800">Hi! How's everything going?</p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <div className="bg-teal-500 text-white p-3 rounded-lg max-w-xs shadow-lg">
                    <p className="text-sm text-gray-100">I'm doing great, thanks! How about you?</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-teal-300 ml-4"></div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-300 shadow-lg">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 bg-white rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="ml-4 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition duration-300">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPanel;