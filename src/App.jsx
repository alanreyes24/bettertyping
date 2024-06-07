// app.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Adjust the import path as necessary
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";

function App() {
  //TODO: move profile code here, so no need to login/fetch on each page individually, can pass as prop

  return (
    <Router>
      <AuthProvider>
        {/* Wrap your routes with AuthProvider */}
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/analysis' element={<Analysis />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
