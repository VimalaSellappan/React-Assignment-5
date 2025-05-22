import React from 'react';
import './HomeRegisterpage.css';

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <p  className='sub-head'>Please sign in here.</p>
      <div className="form-section">
        
        <form className='form-container'>
          <div className='form-content'>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
    </div>
    </div>
  );
}

export default Login;