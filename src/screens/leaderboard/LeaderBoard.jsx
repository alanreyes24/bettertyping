import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./LeaderBoard.css";
import HeaderWrapper from "../../components/header/HeaderWrapper";

function LeaderBoard({ user, handleUserChange, handleLogout }) {
  const [loading, setLoading] = useState(true); // eventually change loading into a cool component that has a cool spiny wheel and such

  const [displayTimedTests, setDisplayTimedTests] = useState(true);
  const [displayAllTimeTests, setDisplayAllTimeTests] = useState(true);

  // all-time timed tests
  const [pulledTests15AllTime, setPulledTests15AllTime] = useState([]);
  const [pulledTests30AllTime, setPulledTests30AllTime] = useState([]);
  const [pulledTests60AllTime, setPulledTests60AllTime] = useState([]);

  // daily timed tests
  const [pulledTests15Daily, setPulledTests15Daily] = useState([]);
  const [pulledTests30Daily, setPulledTests30Daily] = useState([]);
  const [pulledTests60Daily, setPulledTests60Daily] = useState([]);

  // all-time word tests
  const [pulledTestsWord25AllTime, setPulledTestsWords25AllTime] = useState([]);
  const [pulledTestsWord50AllTime, setPulledTestsWords50AllTime] = useState([]);
  const [pulledTestsWord100AllTime, setPulledTestsWords100AllTime] = useState(
    []
  );

  // daily word tests
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
        `http://localhost:3090/test/timeRankings?duration=${duration}&timeFrame=${timeFrame}`
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
        `http://localhost:3090/test/wordRankings?count=${count}&timeFrame=${timeFrame}`
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
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(false); // maybe i should just turn all the calls for the data into one big function then setLoading(false) at the end of that funciton
  }, [pulledTestsWord100AllTime]);

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
    ? pulledTests15AllTime
    : pulledTests15Daily;
  const currentTests30 = displayAllTimeTests
    ? pulledTests30AllTime
    : pulledTests30Daily;
  const currentTests60 = displayAllTimeTests
    ? pulledTests60AllTime
    : pulledTests60Daily;

  const currentTestsWord25 = displayAllTimeTests
    ? pulledTestsWord25AllTime
    : pulledTestsWord25Daily;
  const currentTestsWord50 = displayAllTimeTests
    ? pulledTestsWord50AllTime
    : pulledTestsWord50Daily;
  const currentTestsWord100 = displayAllTimeTests
    ? pulledTestsWord100AllTime
    : pulledTestsWord100Daily;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />
      <div> Time Until Reset: {remainingTime}</div>
      <button onClick={() => setDisplayTimedTests(!displayTimedTests)}>
        Switch to {displayTimedTests ? "Word Tests" : "Timed Tests"}
      </button>
      <button onClick={() => setDisplayAllTimeTests(!displayAllTimeTests)}>
        Switch Between All-Time and Daily
      </button>

      <div>{displayAllTimeTests ? "all-time" : "daily"}</div>

      {loading ? (
        "loading..."
      ) : (
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
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
                      style={{ display: "flex", flex: 1, textAlign: "center" }}
                    >
                      {index + 1}:
                      <div style={{ marginLeft: "0.25rem" }}>
                        {test.username}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      true WPM: {test.results.trueWPM}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      accuracy: {test.results.accuracy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderBoard;
