import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";
import History from "./screens/history/History";
import TestFinished from "./screens/testfinished/TestFinished";
import AITest from "./screens/aitest/AITest";
// Removed unused import HeaderWrapper
import Information from "./screens/information/Information";

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "guest",
  });

  async function checkUserTokenValid() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/tokenCheck`,
        {
          withCredentials: true,
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        _id: response.data._id,
        username: response.data.username,
      }));
    } catch (error) {
      console.log(error.response.data);
      if (
        error.response.data === "Token has expired." ||
        error.response.data === "No token provided."
      ) {
        setUser((prevUser) => ({
          ...prevUser,
          _id: "",
          username: "guest",
        }));
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await checkUserTokenValid();
    };
    fetchData();
  }, []);

  const handleUserChange = (passedUserID, passedUsername) => {
    setUser((prevUser) => ({
      ...prevUser,
      _id: passedUserID,
      username: passedUsername,
    }));
    console.log('set in app')
  };

  const handleLogout = () => {
    console.log("this is running");
    setUser((prevUser) => ({
      ...prevUser,
      _id: "",
      username: "guest",
    }));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/leaderboard"
            element={
              <LeaderBoard
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/analysis"
            element={
              <Analysis
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/ai-test"
            element={
              <AITest
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/information"
            element={
              <Information
                user={user}
                handleUserChange={handleUserChange}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="/test-finished" element={<TestFinished user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
