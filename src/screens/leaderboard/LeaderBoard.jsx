import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderWrapper from "../../components/header/HeaderWrapper";
import "./LeaderBoard.css";

function LeaderBoard({ user, handleUserChange, handleLogout }) {
  const [pulledTests15AllTime, setPulledTests15AllTime] = useState([]);
  const [pulledTests30AllTime, setPulledTests30AllTime] = useState([]);
  const [pulledTests60AllTime, setPulledTests60AllTime] = useState([]);

  useEffect(() => {
    retrieveTimeTestRankings(15);
    retrieveTimeTestRankings(30);
    retrieveTimeTestRankings(60);
  }, []);

  async function retrieveTimeTestRankings(duration) {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/test/timeRankings?duration=${duration}&timeFrame=all-time`
      );
      if (duration === 15) {
        setPulledTests15AllTime(response.data);
      }
      if (duration === 30) {
        setPulledTests30AllTime(response.data);
      }
      if (duration === 60) {
        setPulledTests60AllTime(response.data);
      }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  const currentTests15 = Array.isArray(pulledTests15AllTime)
    ? pulledTests15AllTime.slice(0, 20)
    : [];

  const currentTests30 = Array.isArray(pulledTests30AllTime)
    ? pulledTests30AllTime.slice(0, 20)
    : [];

  const currentTests60 = Array.isArray(pulledTests60AllTime)
    ? pulledTests60AllTime.slice(0, 20)
    : [];

  return (
    <div className="leaderboard-page">
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      {/* Leaderboard Content */}
      <div className="leaderboard">
        <div className="leaderboard-container">
          <div className="leaderboard-section">
            <div className="section-title">15 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests15.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div className="section-title">30 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests30.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div className="section-title">60 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests60.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
