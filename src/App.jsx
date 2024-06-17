import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Adjust the import path as necessary
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";
import TestPage from "./screens/test/TestPage";
import axios from "axios";
import Header from "./components/header/Header";
import TestFinished from "./screens/testfinished/TestFinished";

function App() {

  const [user, setUser] = useState({
    _id: '',
    username: ''
  });

  const [username, setUsername] = useState('guest');

  async function getProfile() {
    try {
      const response = await axios.get("http://localhost:3090/auth/profile", {
        withCredentials: true, // This ensures cookies are included in requests
      });

      console.log(response.data)
      setUsername(response.data.username);
    } catch (error) {
      console.error("Failed to fetch profile:", error.response.data);
      setUsername('guest');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <Header
              passLoggedIn={(username) => {
                setUsername(username);
              }}
              passLogout={() => {
                setUsername("guest");
              }}
              username={username}
              
            />

            <Routes>
              <Route path='/' element={<HomePage user={user} />} />
              <Route path='/leaderboard' element={<LeaderBoard />} />
              <Route path='/analysis/:id' element={<Analysis />} />
              <Route path='/test/:id' element={<TestPage />} />
              <Route path='/test-finished' element={<TestFinished />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;