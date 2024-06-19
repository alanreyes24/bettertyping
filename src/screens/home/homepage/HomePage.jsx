// src/components/homepage/HomePage.jsx
import React, { useEffect } from "react";
import Header from "../../../components/header/Header";
import Login from "../../../components/login/Login";
import Test from "./components/test/Test";
import axios from "axios";
import { useState } from "react";

function HomePage({ user }) {

  useEffect(() => {
    console.log("HomePage user object: ", user)
  },[user])

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Test user={user} />
      </div>
      <div></div>
    </div>
  );
}

export default HomePage;
