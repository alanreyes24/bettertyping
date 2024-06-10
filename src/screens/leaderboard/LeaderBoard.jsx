// LeaderBoard.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./LeaderBoard.css";

const mockData = [
  { name: "alan", color: "#ff1919", wpm: 146.9 },
  { name: "typemaster101", wpm: 134.1 },
  { name: "plant", color: "#ff1919", wpm: 133.3 },
  { name: "jen", wpm: 129.5 },
  { name: "TYPEGOD", wpm: 125.2 },
];


function LeaderBoard() {

  const [pulledTests, setPulledTests] = useState([]);

  useEffect(() => {
    retrieveNumberOfTests();
  }, []); // Empty dependency array means this effect runs once on mount


  async function retrieveNumberOfTests() {
    try {
      console.log("retrieveNumberOfTests is running . . .")
      const response = await axios.get("http://localhost:3090/test/rankings");
      setPulledTests(response.data);
      console.log(pulledTests)
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }





  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div className='leaderboard'>
        <div
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            textAlign: "center",
          }}>
          Leaderboard
        </div>
        <div className='leaderboard-container'> 
          {Array(1)
            .fill(null)
            .map((_, colIndex) => (
              <ul key={colIndex} className='leaderboard-list'>
                {pulledTests.map((test, index) => (
                  <li key={index} className='leaderboard-item'>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        textAlign: "center",
                      }}>
                      {index + 1}:
                      <div
                        style={{
                          marginLeft: "0.25rem",
                        }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                      </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
