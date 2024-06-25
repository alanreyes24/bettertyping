import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import the OpenAI client library
import OpenAI from "openai";

function Analysis() {
  async function getAnalysis() {
    const response = await axios.get("http://localhost:3090/ai/getAnalysis", {
      withCredentials: true,
    });
    setAnalysisJson(response.data);
  }

  const [analysisJson, setAnalysisJson] = useState({});

  const openai = new OpenAI({
    apiKey: "sk-proj-Pz7bUo2OgrJnHFiqmvaoT3BlbkFJk59tRC8yiuRHQyW7A1at",
    dangerouslyAllowBrowser: true,
  });

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          fontSize: "2rem",
        }}
      >
        <div
          style={{
            display: "row",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          analysis
        </div>

        <>
          <a
            onClick={() => {
              getAnalysis();
            }}
          >
            Get Analysis
          </a>
          <div style={{ fontSize: "10px" }}>{JSON.stringify(analysisJson)}</div>
        </>
      </div>
    </>
  );
}

export default Analysis;
