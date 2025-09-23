import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import TripDashboard from './pages/TripDashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<TripDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
