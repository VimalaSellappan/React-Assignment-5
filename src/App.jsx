import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRegisterpage from './components/HomeRegisterpage'; 
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeRegisterpage />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;