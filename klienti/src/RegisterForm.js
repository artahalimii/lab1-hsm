/*import React, { useState } from 'react';
import { register } from './authService';
// import './register.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const success = await register(username, email, password);

      if (success) {
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

  return (
    <form className='registerForm' onSubmit={handleRegister}>
      <div className='register-page'>
        <h2 className="card-title">Register</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <table>
          <tbody>
            <tr>
              <td>
                <label className='register-user-a'>
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
                <label className='register-user-b'>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label className='register-user-c'>
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
                <button className='button' type="submit">Register</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default RegisterForm;*/
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
      const response = await register(username, email, password);

      if (response.success) {
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

  

  // return (
  //   <div className="container d-flex align-items-center justify-content-center vh-100">
  //     <div className="card text-center">
  //       <div className="card-body">
  //           <h5 className="modal-title">Register</h5>
            
          
  //         <div className="modal-body">
  //           {error && <div className="alert alert-danger">{error}</div>}
  //           {success && <div className="alert alert-success">{success}</div>}
  //           <form onSubmit={handleRegister}>
  //             <div className="mb-3">
  //               <input
  //                 type="text"
  //                 className="form-control py-3"
  //                 placeholder="Username"
  //                 value={username}
  //                 onChange={(e) => setUsername(e.target.value)}
  //               />
  //             </div>
  //             <div className="mb-3">
  //               <input
  //                 type="email"
  //                 className="form-control py-3"
  //                 placeholder="Email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //               />
  //             </div>
  //             <div className="mb-3">
  //               <input
  //                 type="password"
  //                 className="form-control py-3"
  //                 placeholder="Password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </div>
  //             <button type="submit" className="btn btn-primary w-100 py-3">Register</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card text-center" style={{ width: '30rem' }}>
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
