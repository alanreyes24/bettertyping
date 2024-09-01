import React, { useEffect, useState } from "react";
import axios from "axios";
import { Scatter } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import HeaderWrapper from "../../components/header/HeaderWrapper";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./TestFinished.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function TestFinished(user) {
  const location = useLocation();
  const [mostRecentTest, setMostRecentTest] = useState(null);
  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);

  useEffect(() => {
    const fetchDataAndLog = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/test/userMostRecentTest`,
        {
          withCredentials: true,
        }
      );
      setMostRecentTest(response.data);
    };

    fetchDataAndLog();
  }, []);

  useEffect(() => {
    if (mostRecentTest) {
      setTrueWPMArray(mostRecentTest.words.trueWPMArray);
      setRawWPMArray(mostRecentTest.words.rawWPMArray);
    }
  }, [mostRecentTest]);

  const wpmData = {
    datasets: [
      {
        label: "True WPM",
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
        label: "Raw WPM",
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
      <HeaderWrapper
        passLoggedIn={() => {}}
        passLogout={() => {}}
        user={user}
      />
      <div className="test-finished-container">
        <div className="test-finished-header">
          {mostRecentTest?.username}'s test results
        </div>
        <div className="test-finished-results">
          <div>
            <span className="test-finished-label">raw WPM:</span>{" "}
            {mostRecentTest?.results.rawWPM}
          </div>
          <div>
            <span className="test-finished-label">true WPM:</span>{" "}
            {mostRecentTest?.results.trueWPM}
          </div>
          <div>
            <span className="test-finished-label">correct only WPM:</span>{" "}
            {mostRecentTest?.results.correctOnlyWPM}
          </div>
          <div>
            <span className="test-finished-label">accuracy:</span>{" "}
            {mostRecentTest?.results.accuracy}%
          </div>
        </div>
        <div className="test-finished-chart">
          <Scatter data={wpmData} options={options} />
        </div>
      </div>
    </>
  );
}

export default TestFinished;
