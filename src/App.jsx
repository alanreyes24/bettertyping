// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homepage/HomePage';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
