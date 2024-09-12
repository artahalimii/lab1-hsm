import React, { useState } from 'react';
import { login } from './authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await login(username, password);

      if (response.success) {
        const role = response.role;
        localStorage.setItem('role', role); // Store role in local storage

        // Redirect based on the role
        switch (role) {
          case 'admin':
            window.location.href = 'http://localhost:3000/Doki';
            break;
          case 'doktor':
            window.location.href = 'http://localhost:3000/Doktori';
            break;
          case 'patient':
            window.location.href = 'http://localhost:3000/PatientDashboard';
            break;
          default:
            window.location.href = 'http://localhost:3000/Home';
            break;
        }
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Network error or invalid credentials');
      console.error('Error during login:', err);
    }
  };

  // Inline styles for background and card
  const containerStyle = {
    backgroundImage: 'url(https://i.pinimg.com/originals/93/4c/85/934c8571ada4723a826036429d632359.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle} className="text-center">
        <h2 className="card-title mb-4">Hospital Management System</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">Don't have an account? <a href="/RegisterForm">Register now</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
