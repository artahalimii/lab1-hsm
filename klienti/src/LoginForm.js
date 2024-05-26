/*import React, { useState } from 'react';
import { login } from './authService';
import './login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login(username, password);

      if (success) {
        window.location.href = 'http://localhost:3000/Home';
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Network error or invalid credentials');
      console.error('Error during login:', err);
    }
  };

  return (
    <form className='loginForm' onSubmit={handleLogin}>
      <div className='login-page'>
        <h2 className="card-title">Log In</h2>
        {error && <div className="error-message">{error}</div>}
        <table>
          <tbody>
            <tr>
              <td>
                <label className='login-user-a'>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className='login-user-b'>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button className='button' type="submit">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default LoginForm;*/
/*import React, { useState } from 'react';
import { login } from './authService';
import './login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      
      if (response.success) {
        const role = response.role;
        if (role === 'admin') {
          window.location.href = 'http://localhost:3000/Doki';
        } else if (role === 'user') {
          window.location.href = 'http://localhost:3000/Home';
        } else {
          window.location.href = 'http://localhost:3000/Home';
        }
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Network error or invalid credentials');
      console.error('Error during login:', err);
    }
  };

  return (
    <form className='loginForm' onSubmit={handleLogin}>
      <div className='login-page'>
        <h2 className="card-title">Log In</h2>
        {error && <div className="error-message">{error}</div>}
        <table>
          <tbody>
            <tr>
              <td>
                <label className='login-user-a'>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className='login-user-b'>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button className='button' type="submit">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default LoginForm;*/
import React, { useState } from 'react';
import { login } from './authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      
      if (response.success) {
        const role = response.role;
        if (role === 'admin') {
          window.location.href = 'http://localhost:3000/Doki';
        } else if (role === 'user') {
          window.location.href = 'http://localhost:3000/Home';
        } else {
          window.location.href = 'http://localhost:3000/Home';
        }
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Network error or invalid credentials');
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card text-center">
        <div className="card-body">
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
    </div>
  );
};

export default LoginForm;



