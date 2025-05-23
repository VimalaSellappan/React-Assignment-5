import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import  Login  from './Login';

import './HomeRegisterpage.css'
function HomeRegisterpage() {
  const [name, setName] = useState("");
const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!name || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];

  if (storedAccounts.some((account) => account.name === name)) {
    alert("This account name already exists.");
    return;
  }

  const newAccount = { name, password };
  storedAccounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(storedAccounts));
  alert("Registration successful!");
  setName('');
  setPassword('');
  navigate('/login'); 
  };
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
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='form-content'>
            <input type="text" placeholder="Full Name" value={name}
              onChange={(e) => setName(e.target.value)} required />
            
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
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