import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/Header";
import "./LeaderBoard.css";

function LeaderBoard() {

  const [displayTimedTests, setDisplayTimedTests] = useState(false);

  const [pulledTests15, setPulledTests15] = useState([]);
  const [pulledTests30, setPulledTests30] = useState([]);
  const [pulledTests60, setPulledTests60] = useState([]);

  const [pulledTestsWord25, setPulledTestsWords25] = useState([]);
  const [pulledTestsWord50, setPulledTestsWords50] = useState([]);
  const [pulledTestsWord100, setPulledTestsWords100] = useState([]);


  useEffect(() => {
    retrieveTimeTestRankings(15);
    retrieveTimeTestRankings(30);
    retrieveTimeTestRankings(60);
    retrieveWordTestRankings('words')
  }, []);

  async function retrieveTimeTestRankings(duration) {
    try {
      console.log(`retrieveTimeTestRankings is running for ${duration} seconds`);
      const response = await axios.get(`http://localhost:3090/test/timeRankings?duration=${duration}`);
      
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

  async function retrieveWordTestRankings(type) {

    const response = await axios.get(`http://localhost:3090/test/wordRankings?type=${type}`);

    let allWordTests = response.data;

    console.log(allWordTests)

    for (let i = 0; i < allWordTests.length; i++) {

      if (allWordTests[i].settings.count == 25) {
        setPulledTestsWords25(prevState => [...prevState, allWordTests[i]]);
      } else if ( allWordTests[i].settings.count == 50) {
        setPulledTestsWords50(prevState => [...prevState, allWordTests[i]]);
      } else if ( allWordTests[i].settings.count == 100) {
        setPulledTestsWords100(prevTest => [...prevTest, allWordTests[i]]);
      } else {
        console.log("Something is wrong with what the settings.count was set to")
      }


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
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
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
              ))}
          </div>

          <div className='leaderboard-section'>
            <h2>100 Word Test</h2>
            {Array(1)
              .fill(null)
              .map((_, colIndex) => (
                <ul key={colIndex} className='leaderboard-list'>
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
              ))}
          </div>
        </div>




      </div>
    </div>



  );
}

export default LeaderBoard;
