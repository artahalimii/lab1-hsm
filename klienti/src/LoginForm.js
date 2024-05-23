import React, { useState } from 'react';
import { login } from './authService';
import './login.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(username, password);

    if (success) {
      // Redirect to home page or any other route after successful login
      window.location.href = 'http://localhost:3000/Home'; // Replace '/home' with the desired route
    } else {
      console.error('Authentication failed');
    }
  };

  return (
    <form className='loginForm'>
      <div className='login-page'>
        <h2 className="card-title">Log In</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <label className='login-user-a'>
                  Username:
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className='login-user-b'>
                  Password:
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button className='button' onClick={handleLogin}>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default LoginForm;
