import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './HomeRegisterpage.css';


function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
    e.preventDefault();       
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const matchingAccount = storedAccounts.find((account) => account.name === name && account.password === password);

    if (matchingAccount) {
    alert("Login successful!");
    navigate('/game'); 
    }
    else {
      alert("Incorrect name or password.");
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      <p  className='sub-head'>Please sign in here.</p>
      <div className="form-section">
        
        <form className='form-container' onSubmit={handleLogin}>
          <div className='form-content'>
            <input type="text" value={name}  onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
    </div>
    </div>
  );
}

export default Login;