import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/MessageInput.css';

const MessageInput = ({ contactId, setMessages }) => {
  const [message, setMessage] = useState('');
  const { dispatch } = useAppContext();

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'me',
        text: message,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { contactId, message: newMessage },
      });

      setMessage('');
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
