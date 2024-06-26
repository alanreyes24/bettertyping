import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import "./History.css";

function History({ user }) {
  const [allUserTests, setAllUserTests] = useState([]);
  const [userHasTakenTests, setUserHasTakenTests] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentlySelectedTest, setCurrentlySelectedTest] = useState(null);
  const [currentTestDate, setCurrentTestDate] = useState(null);

  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);

  function convertTimestampToTime(timestamp) {
    let time = new Date(timestamp);
    let stringifiedTime = time.toString();
    let splitDateString = stringifiedTime.split("GMT");
    let formattedDate = splitDateString[0].trim();

    return formattedDate;
  }

  async function retrieveAllTestsByUser() {
    try {
      let response = await axios.get("http://localhost:3090/test/allByUser", {
        withCredentials: true,
      });

      setAllUserTests(response.data);
      setCurrentlySelectedTest(response.data[0]);

      setTrueWPMArray(response.data[0].words.trueWPMArray);
      setRawWPMArray(response.data[0].words.rawWPMArray);

      setCurrentTestDate(convertTimestampToTime(response.data[0].timestamp));

      setLoading(false);
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data === "No tests found for this user."
      ) {
        setUserHasTakenTests(false);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveAllTestsByUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while waiting for data
  }

  const wpmData = {
    datasets: [
      {
        label: "true wpm",
        data: trueWPMArray,
        cubicInterpolationMode: "monotone",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        showLine: true,
        fill: false,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "#000",
        pointHoverBackgroundColor: "#000",
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
      },
      {
        label: "raw wpm",
        data: rawWPMArray,
        cubicInterpolationMode: "monotone",
        showLine: true,
        fill: true,
        borderWidth: 1,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <>
      {!userHasTakenTests ? (
        <div>You need to take a test in order to use this page</div>
      ) : null}

      <div className="history-container">
        <div className="test-display">
          <div> {currentTestDate} </div>
          <div style={{ width: "95vw", height: "30vh" }}>
            <Scatter data={wpmData} options={options} />
          </div>
        </div>

        <div className="history-content">
          {allUserTests.map((test, index) => (
            <button
              key={index}
              className="card"
              onClick={() => {
                setCurrentlySelectedTest(allUserTests[index]);
                setCurrentTestDate(
                  convertTimestampToTime(allUserTests[index].timestamp)
                );
                setTrueWPMArray(allUserTests[index].words.trueWPMArray);
                setRawWPMArray(allUserTests[index].words.rawWPMArray);
              }}
            >
              <div>
                {" "}
                {convertTimestampToTime(allUserTests[index].timestamp)}
              </div>
              <div>Type: {test.settings.type}</div>
              <div>Length: {(test.settings.length || 0) / 10}</div>
              <div>True WPM: {test.results.trueWPM}</div>
              <div>Accuracy: {test.results.accuracy}%</div>
              <div> word difficulty: {test.settings.difficulty}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
