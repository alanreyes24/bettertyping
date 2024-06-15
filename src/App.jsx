// app.jsx

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
import TestFinished from "./screens/testfinished/TestFinished"

function App() {

  const [username, setUsername] = useState('');

  async function getProfile() {
    const token = localStorage.getItem("auth-token");
  
    if (token != null) {
      try {
        const response = await axios.get("http://localhost:3090/auth/profile", {
          headers: {
            "auth-token": token,
          },
        });
  
        // Assuming the response.data contains the user object
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch profile:", error.response.data);
      }
    } else {
      setUsername('guest');
    }
  }
  

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
      console.log("recognized that got changed")
      console.log("app username: ", username)
  }, [username]);

  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <Header
              passLogout={() => { // need to flesh this out more
                setUsername("guest");
                localStorage.clear("auth-token");
              }}
              username={username}
              passLoggedIn={(username) => setUsername(username)}
            />

            <Routes>
              <Route path='/' element={<HomePage user={username} />} />
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
