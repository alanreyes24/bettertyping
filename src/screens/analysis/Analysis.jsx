import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./Analysis.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Analysis() {
  async function getAnalysis() {
    const response = await axios.get("http://localhost:3090/ai/getAnalysis", {
      withCredentials: true,
    });
    setAnalysisJson(response.data);
  }

  const [analysisJson, setAnalysisJson] = useState({});

  console.log(analysisJson);

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
