import React from 'react';
import { Link } from 'react-router-dom';
import { Login } from './Login';

import './HomeRegisterpage.css'
function HomeRegisterpage() {
  return (
    <div className="home-container">
      <div className="welcome-part">
            <h1>Welcome to Dog Matcher</h1>
            <p className='sub-head'>Join us to Play!</p>
        </div>
      <div className='bottom-part'>
    <div className="register-container">
        
        <div className="form-section">
        <h2>Sign Up here</h2>
        <form className='form-container'>
          <div className='form-content'>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Create Account</button>
        </form>
        <p className="signin">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
    <div className='image-container'>
      <img src='../images/dog.png'/>
    </div>
    </div>
    </div>
  );
}

export default HomeRegisterpage;