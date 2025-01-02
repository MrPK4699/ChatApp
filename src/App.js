import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import LoginForm from './components/LoginForm';
// import SignupForm from './components/SignupForm';
import './App.css';
import SignupForm from './components/SignupForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when the component mounts
  useEffect(() => {
    const contactId = localStorage.getItem('myContactId');
    if (contactId) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handler to log out the user
  const handleLogout = () => {
    localStorage.removeItem('myContactId');
    setIsLoggedIn(false);
  };

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/chat" />
              ) : (
                  <LoginForm onLogin={() => setIsLoggedIn(true)} />
              )
            }
          />
          
          {/* Route for Sign Up page */}
          <Route
            path="/signup"
            element={ <SignupForm/> }
            
          />

          {/* Route for the chat application */}
          <Route
            path="/chat"
            element={
              isLoggedIn ? (
                <>
                  <header className="app-header">
                    <h2>Welcome to ChatApp</h2>
                    <button onClick={handleLogout}>Logout</button>
                  </header>
                  <div className="app-container">
                    <ContactList />
                    <div className="chat-section">
                      <ChatWindow />
                      <MessageInput />
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Redirect to login as the default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
