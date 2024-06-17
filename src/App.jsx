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


  useEffect(() => {
    console.log("recognized that username got changed");
    console.log("app username: ", username);
  }, [username]);

  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <Header
              passLogout={() => {
                setUsername("guest");
              }}
              username={username}
              passLoggedIn={(username) => {
                setUsername(username);
              }}
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