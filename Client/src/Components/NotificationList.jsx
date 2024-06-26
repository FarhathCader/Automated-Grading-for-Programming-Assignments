import React, { useState } from 'react';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotificationList = () => {
  // Initial list of dummy messages with read status
  const initialMessages = [
    { text: "Message 1: This is a dummy message.", read: false },
    { text: "Message 2: Another dummy message.", read: true },
    { text: "Message 3: Yet another message.", read: false },
    { text: "Message 4: Dummy message here.", read: false },
    { text: "Message 5: More dummy messages.", read: false },
    { text: "Message 6: Keep reading dummy messages.", read: true },
    { text: "Message 7: Almost there.", read: false },
    { text: "Message 8: Just a few more.", read: false },
    { text: "Message 9: Nearly done.", read: false },
    { text: "Message 10: Last dummy message.", read: false }
  ];

  // State to manage messages
  const [messages, setMessages] = useState(initialMessages);
  const navigate = useNavigate();

  // Function to delete a single message
  const deleteMessage = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  };

  // Function to mark all messages as read
  const markAllAsRead = () => {
    setMessages(messages.map(message => ({ ...message, read: true })));
  };

  // Function to delete all messages
  const deleteAllMessages = () => {
    setMessages([]);
  };

  // Function to navigate back
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-lg mx-auto relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FaArrowLeft size={24} />
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
      <div className="flex justify-between mb-4">
        <button 
          onClick={markAllAsRead} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Mark All as Read
        </button>
        <button 
          onClick={deleteAllMessages} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete All
        </button>
      </div>
      <ul className="space-y-4">
        {messages.map((message, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <span className={message.read ? "text-gray-500" : "text-black"}>{message.text}</span>
            <button 
              onClick={() => deleteMessage(index)} 
              className="text-red-400 hover:text-red-500 focus:outline-none"
            >
              <FaTrash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
