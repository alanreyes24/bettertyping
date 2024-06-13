import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./LeaderBoard.css";

function LeaderBoard() {

  const [displayTimedTests, setDisplayTimedTests] = useState(false);
  const [pulledTests15, setPulledTests15] = useState([]);
  const [pulledTests30, setPulledTests30] = useState([]);
  const [pulledTests60, setPulledTests60] = useState([]);

  useEffect(() => {
    retrieveTypeOfTests(15);
    retrieveTypeOfTests(30);
    retrieveTypeOfTests(60);
  }, []);

  async function retrieveTypeOfTests(duration) {
    try {
      console.log(`retrieveTypeOfTests is running for ${duration} seconds`);
      const response = await axios.get(`http://localhost:3090/test/rankings?duration=${duration}`);
      
      if (duration === 15) { setPulledTests15(response.data); }
      if (duration === 30) { setPulledTests30(response.data); }
      if (duration === 60) { setPulledTests60(response.data); }

      console.log(pulledTests15);
      console.log(pulledTests30);
      console.log(pulledTests60);

    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>

      <button onClick={() => setDisplayTimedTests(!displayTimedTests)}> Switch to Word Tests </button>
      <div className='leaderboard'>
        

        <div style={{ display: displayTimedTests? "flex" : "none"}}className='leaderboard-container'> 
          <div className='leaderboard-section'>
            <h2>15 Seconds Tests</h2>
                <ul className='leaderboard-list'>
                  {pulledTests15.map((test, index) => (
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
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
                  {pulledTests30.map((test, index) => (
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
              ))}
          </div>

          <div className='leaderboard-section'>
            <h2>60 Seconds Tests</h2>
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
                  {pulledTests60.map((test, index) => (
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
              ))}
          </div>
        </div>

        <div style={{ display: displayTimedTests? "none" : "Flex"}}className='leaderboard-container'> 
          <div className='leaderboard-section'>
            <h2>25 Word Tests</h2>
                <ul className='leaderboard-list'>
                  {pulledTests15.map((test, index) => (
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
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
                  {pulledTests30.map((test, index) => (
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
              ))}
          </div>

          <div className='leaderboard-section'>
            <h2>100 Word Test</h2>
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
                  {pulledTests60.map((test, index) => (
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
              ))}
          </div>
        </div>




      </div>
    </div>



  );
}

export default LeaderBoard;
