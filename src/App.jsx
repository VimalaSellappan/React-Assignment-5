import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRegisterPage from './components/HomeRegisterpage'; 
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeRegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
