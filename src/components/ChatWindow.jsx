import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';
import '../styles/ChatWindow.css';
import Message from './Message';

const ChatWindow = () => {
  const { state } = useAppContext();
  const { showMessages } = useInstantDB();

  const selectedContact = state.selectedContact;
  const { isLoading, error, messages } = showMessages(selectedContact?.contactId);
  console.log(messages)

  if (!selectedContact) return <div className="placeholder">Select a contact to start chatting</div>;
  if (isLoading) return <div className="placeholder">Loading messages...</div>;
  if (error) return <div className="placeholder">Error loading messages: {error.message}</div>;

  return (
    <div className="chat-window">
      <div className="chat-header">{selectedContact.name}</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <Message message={message} key={message.id}/>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
