import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthCheck } from '../hooks/useAuthCheck';
import '../styles/LoginForm.css'; 

const LoginForm = ({ onLogin }) => {
  const [contactId, setContactId] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const { useLoginCheck } = useAuthCheck();
  const { user, isLoading, error } = useLoginCheck(contactId);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) {
      alert('Checking user credentials...');
      return;
    }

    if (error) {
      alert('Error checking user: ' + error.message);
      return;
    }

    try {
      const loggedInUser = await loginUser({ contactId, password }, user);
      alert(`Welcome ${loggedInUser.name}!`);
      onLogin();
    } catch (loginError) {
      alert('Login failed: ' + loginError.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log In</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="contactId">Contact ID</label>
          <input
            type="tel"
            id="contactId"
            placeholder="Enter your 10-digit Contact number"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log In'}
        </button>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

