import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRegisterPage from './components/HomeRegisterpage'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeRegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
