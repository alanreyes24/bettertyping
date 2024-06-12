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
  //TODO: move profile code here, so no need to login/fetch on each page individually, can pass as prop

  const [user, setUser] = useState("");

  async function getProfile() {
    const token = localStorage.getItem("auth-token");

    if (token != null) {
      try {
        const response = await axios.get("http://localhost:3090/auth/profile", {
          headers: {
            "auth-token": token,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error.response.data);
      }
    } else {
      setUser("guest");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Router>
        <AuthProvider>
          {/* Wrap your routes with AuthProvider */}
          <div>
            <Header
              passLogout={() => {
                setUser("guest");
                localStorage.clear("auth-token");
              }}
              username={user.username}
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
