import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";
import History from "./screens/history/History";
import TestFinished from "./screens/testfinished/TestFinished";
import AITest from "./screens/aitest/AITest";
import HeaderWrapper from "./components/header/HeaderWrapper";

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    aiTestMode: false,
    aiWordList: [],
  });

  async function checkUserTokenValid() {
    try {
      const response = await axios.get(
        "http://localhost:3090/auth/tokenCheck",
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
      <AuthProvider>
        <div>
          <HeaderWrapper
            passLoggedIn={handleUserChange}
            passLogout={handleLogout}
            user={user}
          />
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/analysis" element={<Analysis user={user} />} />
            <Route path="/history" element={<History user={user} />} />
            <Route path="/test-finished" element={<TestFinished />} />
            <Route path="/ai-test" element={<AITest user={user} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
