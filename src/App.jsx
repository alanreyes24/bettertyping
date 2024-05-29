import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homepage/HomePage';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import Analysis from './components/analysis/Analysis';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
