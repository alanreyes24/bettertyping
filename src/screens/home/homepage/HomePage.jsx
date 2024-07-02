// src/components/homepage/HomePage.jsx
import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Login from "../../../components/login/Login";
import Test from "./components/test/Test";
import axios from "axios";

function HomePage({ user }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("normal");

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <button onClick={() => setSelectedDifficulty("easy")}> easy </button>
      <button onClick={() => setSelectedDifficulty("normal")}> normal </button>
      <button onClick={() => setSelectedDifficulty("hard")}> hard </button>

      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Test user={user} selectedDifficulty={selectedDifficulty} />
      </div>
    </div>
  );
}

export default HomePage;
