import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";
import TestPage from "./screens/test/TestPage";
import Header from "./components/header/Header";
import History from "./screens/history/History";
import TestFinished from "./screens/testfinished/TestFinished";

function App() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    aiTestMode: false,
    aiWordList: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  async function retrieveAIWordList() {
    try {
      const response = await axios.get(
        "http://localhost:3090/ai/getAIWordList",
        { withCredentials: true }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.practiceWords);
        setUser((prevUser) => ({
          ...prevUser,
          aiTestMode: true,
          aiWordList: response.data.practiceWords,
        }));
      } else {
        console.error("Failed to retrieve AI word list:", response.statusText);
        setUser((prevUser) => ({
          ...prevUser,
          aiTestMode: false,
          aiWordList: [],
        }));
      }
    } catch (error) {
      console.error("Error retrieving AI word list:", error.message);
    }
  }

  async function checkUserTokenValid() {
    try {
      const response = await axios.get(
        "http://localhost:3090/auth/tokenCheck",
        { withCredentials: true }
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
      await retrieveAIWordList();
      setIsLoading(false);
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
    setUser((prevUser) => ({
      ...prevUser,
      _id: "",
      username: "guest",
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <div>
          <Header
            passLoggedIn={handleUserChange}
            passLogout={handleLogout}
            username={user.username}
          />
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/history" element={<History user={user} />} />
            <Route path="/test/:id" element={<TestPage />} />
            <Route path="/test-finished" element={<TestFinished />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
