import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Test from "./../home/homepage/components/test/Test";

function Analysis({ user }) {
  async function getAnalysis() {
    const response = await axios.get("http://localhost:3090/ai/getAnalysis", {
      withCredentials: true,
    });
    setAnalysisJson(response.data);
  }

  const [analysisJson, setAnalysisJson] = useState({});

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "15vh", // Adjusted height to ensure visibility
          overflow: "auto", // Changed from hidden to auto
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
          }}
        >
          Get Analysis
        </a>
        <div style={{ fontSize: "10px" }}>{JSON.stringify(analysisJson)}</div>
      </div>
    </>
  );
}

export default Analysis;
