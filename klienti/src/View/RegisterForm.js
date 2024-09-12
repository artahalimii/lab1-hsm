import React, { useState } from 'react';
import { register } from './authService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const isSuccess = await register(username, email, password);

      if (isSuccess) {
        setSuccess('User registered successfully');
        setError('');
      } else {
        setError('Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Network error or invalid credentials');
      setSuccess('');
      console.error('Error during registration:', err);
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
    maxWidth: '500px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <div className="card text-center" style={cardStyle}>
        <div className="card-body">
          <h5 className="modal-title mb-4">Register</h5>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control py-3"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control py-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control py-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-3">Register</button>
            </form>
            <p className="mt-3">Already have an account? <a href="/LoginForm">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
