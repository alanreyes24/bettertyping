// EndTest.jsx

import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
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

// Register all necessary plugins including Filler
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

const LineChart = ({ test }) => {

  let timerLength = test.timer.length / 10;

  const [testCorrectChartData, setTestCorrectChartData] = useState([]);
  const [testErrorChartData, setTestErrorChartData] = useState([]);

  let correctLetters = test.words.correctLetters;
  let incorrectLetters = test.words.incorrectLetters;

  let correctSecondCount = 0;
  let incorrectSecondCount = 0;

  function updateChart() {
    for (let key in correctLetters) {
      if (correctLetters.hasOwnProperty(key)) {
        correctSecondCount++;
      }
    }

    for (let key in incorrectLetters) {
      if (incorrectLetters.hasOwnProperty(key)) {
        incorrectSecondCount++;
      }
    }

    for (let i = 0; i < correctSecondCount; i++) {
      let amountOfLetters = correctLetters[i].length;

      let cords = { x: i, y: amountOfLetters };

      let array = testCorrectChartData;
      array.push(cords);

      setTestCorrectChartData(array);
    }

    for (let i = 0; i < incorrectSecondCount; i++) {
      let amountOfLetters = incorrectLetters[i].length;

      let cords = { x: i, y: amountOfLetters };
      let array = testErrorChartData;

      array.push(cords);

      setTestErrorChartData(array);
    }
  }

  useEffect(() => {
    if (test.finished) {
      updateChart();
      console.log(timerLength)
    }
  }, [test]);

  const data = {
    datasets: [
      {
        label: "correct",
        data: testCorrectChartData,
        backgroundColor: "rgba(0,0,139,0.2)",
        showLine: true,
        fill: true,
        borderWidth: 1,
        borderColor: "rgba(0,0,139,1)",
        pointBackgroundColor: "rgba(0,0,139,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0,0,139,1)",
      },
      {
        label: "errors",
        data: testErrorChartData,
        showLine: true,
        fill: true,
        borderWidth: 1,
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "rgba(255,0,0,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,0,0,1)",
      },
    ],
  };

  const options = {
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
          stepSize: 1, // Ensure every data point is displayed on the x-axis
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <div
      style={{
        display: test.finished? "flex" : "none",
        width: "70%",
        height: "35vh",
      }}>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default LineChart;