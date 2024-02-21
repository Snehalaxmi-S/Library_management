import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Login.css";


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        // Registration logic
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status === 201) {
          // Registration successful
          setErrorMessage('');
          console.log('Registration successful!');
        } else {
          // Registration failed
          const data = await response.json();
          setErrorMessage(data.error || 'Registration failed');
        }
      } else {
        // Login logic
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status === 200) {
          // Login successful
          setErrorMessage('');
          console.log('Login successful!');

          // Check user type and redirect accordingly
          const userData = await response.json();
          const userType = userData.userType;

          // Redirect to the appropriate page
          history(userType === 'admin' ? '/dashboard' : '/books');
        } else {
          // Login failed
          const data = await response.json();
          setErrorMessage(data.error || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Network error during authentication:', error);
      setErrorMessage('Network error. Please try again later.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="login container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
