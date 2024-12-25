import React from 'react';
import { AppProvider } from './context/AppContext';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';

const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <ContactList />
        <div className="chat-section">
          <ChatWindow />
          <MessageInput />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
