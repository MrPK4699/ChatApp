// import React, { useState } from 'react';
// import { AppProvider } from './context/AppContext';
// import ContactList from './components/ContactList';
// import ChatWindow from './components/ChatWindow';
// import MessageInput from './components/MessageInput';
// import './App.css';
// import SignupForm from './components/SignupForm';
// import LoginForm from './components/LoginForm';

// const App = () => {
//   const [isLogedIn, setIsLogedIn] = useState(false);
//   localStorage.getItem('myContactId')

//   return (
//     <AppProvider>
//       {/* <div className="app-container">
//         <ContactList />
//         <div className="chat-section">
//           <ChatWindow />
//           <MessageInput />
//         </div>
//       </div> */}
//       <SignupForm/>
//       <LoginForm/>
//     </AppProvider>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { AppProvider } from './context/AppContext';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

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
      {isLoggedIn ? (
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
        <div className="auth-container">
          <h1>Please Sign Up or Log In</h1>
          <SignupForm />
          <LoginForm />
        </div>
      )}
    </AppProvider>
  );
};

export default App;

