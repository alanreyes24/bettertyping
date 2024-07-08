// TestFinished.j

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
  const { AIMode } = location.state || {};

  const [mostRecentTest, setMostRecentTest] = useState(null);
  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);

  useEffect(() => {
    console.log("Aimode:", AIMode);
  }, []);
  const retrieveMostRecentChartData = async (AIMode) => {
    console.log();
    if (!AIMode) {
      console.log("regular");
      const response = await axios.get(
        "http://localhost:3090/test/userMostRecentTest",
        {
          withCredentials: true,
        }
      );
      setMostRecentTest(response.data);
    } else if (AIMode) {
      const response = await axios.get(
        "http://localhost:3090/ai/mostRecentTest",
        {
          withCredentials: true,
        }
      );
      setMostRecentTest(response.data);
    }
  };

  useEffect(() => {
    const fetchDataAndLog = async () => {
      await retrieveMostRecentChartData(AIMode);
    };

    fetchDataAndLog();
  }, []);

  useEffect(() => {
    // not really necessary but good to have just in case
    if (mostRecentTest) {
      setTrueWPMArray(mostRecentTest.words.trueWPMArray);
      setRawWPMArray(mostRecentTest.words.rawWPMArray);
    }
  }, [mostRecentTest]);

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
      <HeaderWrapper
        passLoggedIn={() => {}}
        passLogout={() => {}}
        user={user}
        AIMode={AIMode}
      />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: AIMode ? "#80C080" : "#ADD8E6",
        }}
      >
        {AIMode && <div> AI Test: </div>}
        <div>{mostRecentTest?.username}</div>
        <div>{mostRecentTest?.results.rawWPM}</div>
        <div>{mostRecentTest?.results.trueWPM}</div>
        <div>{`AI Mode: ${AIMode}`}</div>
        <div style={{ width: "95vw", height: "50vh" }}>
          <Scatter data={wpmData} options={options} />
        </div>
      </div>
    </>
  );
}

export default TestFinished;
