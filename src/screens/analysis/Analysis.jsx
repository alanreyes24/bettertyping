import React, { useState } from "react";
import Header from "../../components/header/Header";
import "./Analysis.css";
import axios from "axios";

function Analysis({ user, handleUserChange, handleLogout }) {
  const [isLoading, setIsLoading] = useState(false);

  async function getAnalysis() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/ai/getAnalysis`,
      {
        withCredentials: true,
      }
    );
    setAnalysisJson(response.data);
    setIsLoading(false);
  }

  const [analysisJson, setAnalysisJson] = useState({});

  return (
    <>
      <Header
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          fontSize: "2rem",
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          analysis
        </div>

        <a
          onClick={() => {
            getAnalysis();
            setIsLoading(true);
          }}
        >
          Get Analysis
        </a>
        {isLoading && (
          <div class="load">
            <div class="progress"></div>
            <div class="progress"></div>
            <div class="progress"></div>
          </div>
        )}
        <div style={{ fontSize: "10px" }}>{JSON.stringify(analysisJson)}</div>
      </div>
    </>
  );
}

export default Analysis;
