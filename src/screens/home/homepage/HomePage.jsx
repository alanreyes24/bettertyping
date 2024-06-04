// src/components/homepage/HomePage.jsx
import React from "react";
import Header from "../../../components/header/Header";
import Login from "../../../components/login/Login";
import Test from "./components/test/Test";

function HomePage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Header />
      <Login />
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Test />
      </div>
    </div>
  );
}

export default HomePage;
