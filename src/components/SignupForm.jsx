import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAuthCheck } from '../hooks/useAuthCheck';

const SignupForm = () => {
  const [contactId, setContactId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const {useUserCheck} =useAuthCheck();
  const { signupUser } = useAuth();
  const { userExists, isLoading, error } = useUserCheck(contactId);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isLoading) {
      alert('Checking if user exists...');
      return;
    }

    if (error) {
      alert('Error checking user existence: ' + error.message);
      return;
    }

    try {
      await signupUser({ contactId, name, password }, userExists);
      alert('Signup successful!');
    } catch (signupError) {
      alert(signupError.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Contact ID"
        value={contactId}
        onChange={(e) => setContactId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
