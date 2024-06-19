import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios"
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

  async function checkUserTokenValid() {

    try {
      
      const response = await axios.get("http://localhost:3090/auth/tokenCheck", {
        withCredentials: true
      })
  
      setUser({
        _id: response.data._id,
        username: response.data.username
      })
  
    } catch (error) {
      console.log(error.response.data) // make this later so that when jwt token expires it displays something unavoidable on the screen
  
      if (error.response.data == "Token has expired.") { 
      
        setUser({
          _id: '',
          username: 'guest'
        });

      } else if (error.response.data == "No token provided.") {
        setUser({
          _id: '',
          username: 'guest'
        });
      }
    }
  }

  const handleUserChange = (passedUserID, passedUsername) => {
    let userID = passedUserID
    let username = passedUsername;
    setUser({
      _id: userID,
      username: username
    });
  };

  const handleLogout = () => {
    setUser((prevUser) => ({
      ...prevUser,
      _id: " ",
      username: 'guest'
    }))
 
  };

  useEffect(() => {
    checkUserTokenValid()
  },[])

  
  return (
    <>
      <Router>
        <AuthProvider>
          <div>
            <Header
              passLoggedIn={handleUserChange}
              passLogout={handleLogout}
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
