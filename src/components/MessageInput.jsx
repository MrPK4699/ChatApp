import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';
import '../styles/MessageInput.css';

const MessageInput = () => {
  const { state } = useAppContext();
  const [newMessage, setNewMessage] = useState('');
  const { addMessage } = useInstantDB();

  const sendMessage = async () => {
    if (!newMessage.trim() || !state.selectedContact) return;

    await addMessage(state.selectedContact.contactId, newMessage);
    setNewMessage('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key==='Enter'){
            sendMessage()
          }
        }}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
