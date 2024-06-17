import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./LeaderBoard.css";

function LeaderBoard() {
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

  const [pulledTestsWord25, setPulledTestsWords25] = useState([]);
  const [pulledTestsWord50, setPulledTestsWords50] = useState([]);
  const [pulledTestsWord100, setPulledTestsWords100] = useState([]);

  useEffect(() => {
    retrieveTimeTestRankings(15, 'daily');
    retrieveTimeTestRankings(30, 'daily');
    retrieveTimeTestRankings(60, 'daily');

    retrieveTimeTestRankings(15, 'all-time');
    retrieveTimeTestRankings(30, 'all-time');
    retrieveTimeTestRankings(60, 'all-time');
    // retrieveWordTestRankings('words')
  }, []);

  async function retrieveTimeTestRankings(duration, timeFrame) {
    try {
      const response = await axios.get(`http://localhost:3090/test/timeRankings?duration=${duration}&timeFrame=${timeFrame}`);

      if (timeFrame === 'all-time') {
        if (duration === 15) { setPulledTests15AllTime(response.data); }
        if (duration === 30) { setPulledTests30AllTime(response.data); }
        if (duration === 60) { setPulledTests60AllTime(response.data); }
      } else if (timeFrame === 'daily') {
        if (duration === 15) { setPulledTests15Daily(response.data); }
        if (duration === 30) { setPulledTests30Daily(response.data); }
        if (duration === 60) { setPulledTests60Daily(response.data); }
      }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  async function retrieveWordTestRankings(type) {
    const response = await axios.get(`http://localhost:3090/test/wordRankings?type=${type}`);
    let allWordTests = response.data;

    for (let i = 0; i < allWordTests.length; i++) {
      if (allWordTests[i].settings.count === 25) {
        setPulledTestsWords25(prevState => [...prevState, allWordTests[i]]);
      } else if (allWordTests[i].settings.count === 50) {
        setPulledTestsWords50(prevState => [...prevState, allWordTests[i]]);
      } else if (allWordTests[i].settings.count === 100) {
        setPulledTestsWords100(prevState => [...prevState, allWordTests[i]]);
      } else {
        console.log("Something is wrong with what the settings.count was set to");
      }
    }
  }

  const currentTests15 = displayAllTimeTests ? pulledTests15AllTime : pulledTests15Daily;
  const currentTests30 = displayAllTimeTests ? pulledTests30AllTime : pulledTests30Daily;
  const currentTests60 = displayAllTimeTests ? pulledTests60AllTime : pulledTests60Daily;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <button onClick={() => setDisplayTimedTests(!displayTimedTests)}> Switch to Word Tests </button>
      <button onClick={() => setDisplayAllTimeTests(!displayAllTimeTests)}> Switch Between All-Time and Daily</button>

      <div className='leaderboard'>
        <div style={{ display: displayTimedTests ? "flex" : "none" }} className='leaderboard-container'>
          <div className='leaderboard-section'>
            <h2>15 Seconds Tests</h2>
            <ul className='leaderboard-list'>
              {currentTests15.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>

          <div className='leaderboard-section'>
            <h2>30 Seconds Tests</h2>
            <ul className='leaderboard-list'>
              {currentTests30.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>

          <div className='leaderboard-section'>
            <h2>60 Seconds Tests</h2>
            <ul className='leaderboard-list'>
              {currentTests60.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: displayTimedTests ? "none" : "flex" }} className='leaderboard-container'>
          <div className='leaderboard-section'>
            <h2>25 Word Tests</h2>
            <ul className='leaderboard-list'>
              {pulledTestsWord25.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>

          <div className='leaderboard-section'>
            <h2>50 Word Tests</h2>
            <ul className='leaderboard-list'>
              {pulledTestsWord50.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>

          <div className='leaderboard-section'>
            <h2>100 Word Tests</h2>
            <ul className='leaderboard-list'>
              {pulledTestsWord100.map((test, index) => (
                <li key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
