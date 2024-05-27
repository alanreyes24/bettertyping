// src/components/homepage/HomePage.jsx
import React from 'react';
import Header from '../header/Header';
import Login from '../login/Login';
import Test from '../test/Test';
import '../../App.css';  // Correct the path to App.css

function HomePage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Header />
      <Login />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Test />
      </div>
    </div>
  );
}

export default HomePage;
