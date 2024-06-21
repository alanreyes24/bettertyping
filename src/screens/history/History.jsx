import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

function History({ user }) {
  const [allUserTests, setAllUserTests] = useState([]);
  const [userHasTakenTests, setUserHasTakenTests] = useState(true); // in future make it so that the user can't even click to this page unless they've taken a test perhaps

  const [currentlySelectedTest, setCurrentlySelectedTest] = useState(null); // i guess null works

  async function retrieveAllTestsByUser() {
    try {
      let response = await axios.get("http://localhost:3090/test/allByUser", {
        withCredentials: true,
      });

      setAllUserTests(response.data);
      setCurrentlySelectedTest(response.data[0]);
    } catch (error) {
      console.log(error);

      if (error.response.data === "No tests found for this user.") {
        setUserHasTakenTests(false);
      }
    }
  }

  useEffect(() => {
    retrieveAllTestsByUser();
  }, []);

  return (
    <>
      {!userHasTakenTests ? (
        <div> You need to take a test in order to use this page </div>
      ) : null}

      <div className="history-container">
        <div className="test-display">
          <div> trueWPM: {currentlySelectedTest.results.trueWPM} </div>
          <div> test length: {currentlySelectedTest.settings.length / 10} </div>
        </div>

        <div className="history-content">
          {allUserTests.map((test, index) => (
            <div key={index} className="card">
              <div> type: {test.settings.type} </div>
              <div> length: {test.settings.length / 10} </div>
              <div> trueWPM: {test.results.trueWPM} </div>
              <div> accuracy: {test.results.accuracy} </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
