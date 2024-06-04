import React from "react";
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
  return (
    <>
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Header />
        <div className='leaderboard'>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              textAlign: "center",
            }}>
            leaderboard
          </div>
          <div className='leaderboard-container'>
            {Array(3)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
                  {mockData.map((entry, index) => (
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
                            color: entry.color,
                            marginLeft: "0.25rem",
                          }}>
                          {entry.name}
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        WPM: {entry.wpm}
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderBoard;
