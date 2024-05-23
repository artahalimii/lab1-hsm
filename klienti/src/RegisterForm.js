import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
   
    try {
      const response = await fetch('http://localhost:5038/api/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username: username, Password: password, Email: email }),
      });

      if (response.ok) {
        window.location.href = '/LoginForm';
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during fetch', error);
    }
  };

  return (
    <form className='registerForm' onSubmit={handleRegister}>
      <div className='register-page'>
        <h2 className='register-title'>Register</h2>
        <label className='register-user-a'>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className='register-user-b'>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className='register-user-c'>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className='register-btn' type="submit">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
