import React from 'react';
import { AppProvider } from './context/AppContext';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import './styles/global.css';

const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <ContactList />
        <ChatWindow />
      </div>
    </AppProvider>
  );
};

export default App;

