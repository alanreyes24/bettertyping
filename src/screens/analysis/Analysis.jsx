import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Test from "./../home/homepage/components/test/Test";
import { useNavigate } from "react-router-dom";

function Analysis({ user }) {
  const navigate = useNavigate();

  const handleAITestRedirect = () => {
    navigate("/ai-test"); 
  };

  const [isLoading, setIsLoading] = useState(false);

  async function getAnalysis() {
    const response = await axios.get("http://localhost:3090/ai/getAnalysis", {
      withCredentials: true,
    });
    setAnalysisJson(response.data);
    setIsLoading(false);
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

        {Object.keys(analysisJson).length > 0 && (
          <button onClick={handleAITestRedirect}>
            {" "}
            navigate to your ai test{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default Analysis;
