import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import MessageInput from './MessageInput';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const { state } = useAppContext();
  const [messages, setMessages] = useState([]);

  const selectedContact = state.selectedContact;

  if (!selectedContact) {
    return <div className="chat-window empty">Select a contact to start chatting</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">{selectedContact.name}</div>
      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === 'me' ? 'sent' : 'received'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <MessageInput contactId={selectedContact.id} setMessages={setMessages} />
    </div>
  );
};

export default ChatWindow;
