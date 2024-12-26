import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthCheck } from '../hooks/useAuthCheck';

const LoginForm = ({onLogin}) => {
  const [contactId, setContactId] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const {useLoginCheck}= useAuthCheck();
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
      onLogin()
    } catch (loginError) {
      alert('Login failed: ' + loginError.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Contact ID"
        value={contactId}
        onChange={(e) => setContactId(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;

