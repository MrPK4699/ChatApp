import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useAuthCheck } from '../hooks/useAuthCheck';
import '../styles/AuthForm.css'; 
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [contactId, setContactId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // yha kiya h change
    // const {useUserCheck} =useAuthCheck();
    // const { signupUser } = useAuth();
    const { signupUser, useUserCheck } = useAuth();


  const { userExists, isLoading, error } = useUserCheck(contactId);

  const navigate = useNavigate();

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
      navigate('/login')
    } catch (signupError) {
      alert(signupError.message);
    }
  };

  return (
    <div className="auth-container">
          <h2 className="auth-title">Sign Up</h2>
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            {error && <p className="error-message">Error: {error.message}</p>}
          </form>
        </div>
  );
};

export default SignupForm;
