// src/components/homepage/HomePage.jsx
import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Login from "../../../components/login/Login";
import Test from "./components/test/Test";
import axios from "axios";

function HomePage({ user }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#ADD8E6",
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Test user={user} AIMode={false} />
      </div>
    </div>
  );
}

export default HomePage;
