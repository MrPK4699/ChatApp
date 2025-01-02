import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthCheck } from '../hooks/useAuthCheck';
import '../styles/AuthForm.css'; 
import { Link } from 'react-router-dom';

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
    <div className="auth-container">
      <h2 className="auth-title">Log In</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="contactId">Contact ID</label>
          <input
            type="text"
            id="contactId"
            placeholder="Enter your Contact ID here"
            value={contactId}
            onChange={(e) => setContactId(e.target.value)}
            // pattern="[0-9]{10}"
            // maxLength="10"
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
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log In'}
        </button>
        <p>Don't have an account? <Link to={'/signup'}>Sign Up</Link></p>
        {error && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

