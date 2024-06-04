import React from "react";
import Header from "../header/Header";
// import EndTest from '../endtest/EndTest';
import "./Analysis.css";

function Analysis() {
  return (
    <>
      <Header />
      {/* <EndTest test={test} /> */}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          fontSize: "2rem",
        }}>
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
          }}>
          analysis
        </div>
        <div style={{ display: "flex" }}>
          <div style={{}}>
            <div style={{ margin: "10px", color: "#818181" }}> 129.89 raw</div>
            <div
              style={{
                margin: "10px",
                fontWeight: "bold",
                fontSize: "calc(40px + 0.5vw)",
              }}>
              {" "}
              125.27 wpm
            </div>
          </div>
          <div>
            <div style={{ margin: "10px", color: "#818181" }}>
              {" "}
              92.75% accuracy
            </div>
            <div style={{ margin: "10px", color: "#818181" }}> 15 errors</div>
          </div>
        </div>
        <div style={{ height: "40%", width: "40%", backgroundColor: "grey" }}>
          graph
        </div>
      </div>
    </>
  );
}

export default Analysis;
