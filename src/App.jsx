import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Adjust the import path as necessary
import "./App.css";
import HomePage from "./screens/home/homepage/HomePage";
import LeaderBoard from "./screens/leaderboard/LeaderBoard";
import Analysis from "./screens/analysis/Analysis";
import TestPage from "./screens/test/TestPage";
import Header from "./components/header/Header";
import TestFinished from "./screens/testfinished/TestFinished";

function App() {

  const [user, setUser] = useState({
    _id: '',
    username: ''
  });

  const [username, setUsername] = useState('guest');

  const updateUserFromLocalStorage = () => {
    const updatedUser = {
      _id: localStorage.getItem('userID') || '',
      username: localStorage.getItem('username') || 'guest',
    };
    setUser(updatedUser);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userID' || event.key === 'username') {
        updateUserFromLocalStorage();
      }
    };

    // Adding event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    updateUserFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("useEffect user:", user);
  }, [user]);

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
    updateUserFromLocalStorage();
  };

  const handleLogout = () => {
    setUsername("guest");
    localStorage.setItem('username', 'guest');
    localStorage.setItem('userID', '')
    updateUserFromLocalStorage();
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <Header
              passLoggedIn={handleUsernameChange}
              passLogout={handleLogout}
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
