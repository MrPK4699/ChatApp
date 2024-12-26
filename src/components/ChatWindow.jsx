import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';
import '../styles/ChatWindow.css';

const ChatWindow = () => {
  const { state } = useAppContext();
  const { useMessages } = useInstantDB();

  const selectedContact = state.selectedContact;
  const { isLoading, error, messages } = useMessages(selectedContact?.id);
  console.log(messages)

  if (!selectedContact) return <div className="placeholder">Select a contact to start chatting</div>;
  if (isLoading) return <div className="chat-window">Loading messages...</div>;
  if (error) return <div className="chat-window">Error loading messages: {error.message}</div>;

  return (
    <div className="chat-window">
      <div className="chat-header">{selectedContact.name}</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
          >
            <div className='msg'>
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
