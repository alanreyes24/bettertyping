import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderWrapper from "../../components/header/HeaderWrapper";
import "./LeaderBoard.css";

function LeaderBoard({ user, handleUserChange, handleLogout }) {
  const [displayTimedTests, setDisplayTimedTests] = useState(true);
  const [displayAllTimeTests, setDisplayAllTimeTests] = useState(true);

  const [pulledTests15AllTime, setPulledTests15AllTime] = useState([]);
  const [pulledTests30AllTime, setPulledTests30AllTime] = useState([]);
  const [pulledTests60AllTime, setPulledTests60AllTime] = useState([]);

  const [pulledTests15Daily, setPulledTests15Daily] = useState([]);
  const [pulledTests30Daily, setPulledTests30Daily] = useState([]);
  const [pulledTests60Daily, setPulledTests60Daily] = useState([]);

  const [pulledTestsWord25AllTime, setPulledTestsWords25AllTime] = useState([]);
  const [pulledTestsWord50AllTime, setPulledTestsWords50AllTime] = useState([]);
  const [pulledTestsWord100AllTime, setPulledTestsWords100AllTime] = useState(
    []
  );

  const [pulledTestsWord25Daily, setPulledTestsWords25Daily] = useState([]);
  const [pulledTestsWord50Daily, setPulledTestsWords50Daily] = useState([]);
  const [pulledTestsWord100Daily, setPulledTestsWords100Daily] = useState([]);

  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    retrieveTimeTestRankings(15, "daily");
    retrieveTimeTestRankings(30, "daily");
    retrieveTimeTestRankings(60, "daily");

    retrieveTimeTestRankings(15, "all-time");
    retrieveTimeTestRankings(30, "all-time");
    retrieveTimeTestRankings(60, "all-time");

    retrieveWordTestRankings(25, "daily");
    retrieveWordTestRankings(50, "daily");
    retrieveWordTestRankings(100, "daily");

    retrieveWordTestRankings(25, "all-time");
    retrieveWordTestRankings(50, "all-time");
    retrieveWordTestRankings(100, "all-time");
  }, []);

  async function retrieveTimeTestRankings(duration, timeFrame) {
    try {
      const response = await axios.get(
        "${process.env.REACT_APP_API_URL}/test/timeRankings?duration=${duration}&timeFrame=${timeFrame}"
      );
      if (timeFrame === "all-time") {
        if (duration === 15) {
          setPulledTests15AllTime(response.data);
        }
        if (duration === 30) {
          setPulledTests30AllTime(response.data);
        }
        if (duration === 60) {
          setPulledTests60AllTime(response.data);
        }
      } else if (timeFrame === "daily") {
        if (duration === 15) {
          setPulledTests15Daily(response.data);
        }
        if (duration === 30) {
          setPulledTests30Daily(response.data);
        }
        if (duration === 60) {
          setPulledTests60Daily(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  async function retrieveWordTestRankings(count, timeFrame) {
    try {
      const response = await axios.get(
        "${process.env.REACT_APP_API_URL}/test/wordRankings?count=${count}&timeFrame=${timeFrame}"
      );
      if (timeFrame === "all-time") {
        if (count === 25) {
          setPulledTestsWords25AllTime(response.data);
        }
        if (count === 50) {
          setPulledTestsWords50AllTime(response.data);
        }
        if (count === 100) {
          setPulledTestsWords100AllTime(response.data);
        }
      } else if (timeFrame === "daily") {
        if (count === 25) {
          setPulledTestsWords25Daily(response.data);
        }
        if (count === 50) {
          setPulledTestsWords50Daily(response.data);
        }
        if (count === 100) {
          setPulledTestsWords100Daily(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  const calculateTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    );
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTests15 = displayAllTimeTests
    ? pulledTests15AllTime.slice(0, 10)
    : pulledTests15Daily.slice(0, 10);
  const currentTests30 = displayAllTimeTests
    ? pulledTests30AllTime.slice(0, 10)
    : pulledTests30Daily.slice(0, 10);
  const currentTests60 = displayAllTimeTests
    ? pulledTests60AllTime.slice(0, 10)
    : pulledTests60Daily.slice(0, 10);

  const currentTestsWord25 = displayAllTimeTests
    ? pulledTestsWord25AllTime.slice(0, 10)
    : pulledTestsWord25Daily.slice(0, 10);
  const currentTestsWord50 = displayAllTimeTests
    ? pulledTestsWord50AllTime.slice(0, 10)
    : pulledTestsWord50Daily.slice(0, 10);
  const currentTestsWord100 = displayAllTimeTests
    ? pulledTestsWord100AllTime.slice(0, 10)
    : pulledTestsWord100Daily.slice(0, 10);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#273564",
      }}
    >
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      {/* Container to center the timer and mode indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "20px 0",
        }}
      >
        {!displayAllTimeTests && (
          <div style={{ fontSize: "2rem", color: "#fff" }}>
            Time Until Reset: {remainingTime}
          </div>
        )}
        <div style={{ fontSize: "2rem", color: "#fff" }}>
          {displayAllTimeTests ? "all-time" : "daily"}
        </div>
      </div>

      {/* Buttons for switching modes */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setDisplayTimedTests(!displayTimedTests)}>
          Switch to {displayTimedTests ? "Word Tests" : "Timed Tests"}
        </button>
        <button onClick={() => setDisplayAllTimeTests(!displayAllTimeTests)}>
          Switch Between All-Time and Daily
        </button>
      </div>

      {/* Leaderboard Content */}
      <div className="leaderboard">
        <div
          style={{ display: displayTimedTests ? "flex" : "none" }}
          className="leaderboard-container"
        >
          <div className="leaderboard-section">
            <div>15 Seconds Tests</div>
            <div className="leaderboard-list">
              {currentTests15.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div>30 Seconds Tests</div>
            <div className="leaderboard-list">
              {currentTests30.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div>60 Seconds Tests</div>
            <div className="leaderboard-list">
              {currentTests60.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ display: displayTimedTests ? "none" : "flex" }}
          className="leaderboard-container"
        >
          <div className="leaderboard-section">
            <div>25 Word Tests</div>
            <div className="leaderboard-list">
              {currentTestsWord25.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div>50 Word Tests</div>
            <div className="leaderboard-list">
              {currentTestsWord50.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div>100 Word Tests</div>
            <div className="leaderboard-list">
              {currentTestsWord100.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
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
