import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeRegisterpage from './components/HomeRegisterpage'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeRegisterpage />} />
      </Routes>
    </div>
  );
}

export default App;