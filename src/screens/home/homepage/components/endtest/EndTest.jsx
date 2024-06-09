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

const LineChart = ({ test, isAnalysis }) => {
  const [switchChart, setSwitchChart] = useState(false);

  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);

  // / / / / // / / / // / / / / // / / / / /

  const calculateWPMs = (type) => {
    if (test.state == 1) {
      let totalCorrect = 0;
      let totalIncorrect = 0;

      for (const [key, value] of Object.entries(test.words.correctLetters)) {
        totalCorrect += value.length;
      }

      for (const [key, value] of Object.entries(test.words.incorrectLetters)) {
        totalIncorrect += value.length;
      }

      let trueWPM =
        (600 * ((totalCorrect - totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);
      let rawWPM =
        (600 * ((totalCorrect + totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);

      //words timer counts up instead of down, so just *-1 if words test!
      if (type == "trueWPM" && !isNaN(trueWPM)) {
        if (test.settings.type == "time") {
          return trueWPM.toFixed(2);
        } else {
          return trueWPM.toFixed(2) * -1;
        }
      } else if (type == "rawWPM" && !isNaN(rawWPM)) {
        if (test.settings.type == "time") {
          return rawWPM.toFixed(2);
        } else {
          return rawWPM.toFixed(2) * -1;
        }
      }
    }
  };

  useEffect(() => {
    if (test.state == 1 && !test.finished) {
      setTimeout(() => {
        setTrueWPMArray((prevArray) => [
          ...prevArray,
          calculateWPMs("trueWPM"),
        ]);
        setRawWPMArray((prevArray) => [...prevArray, calculateWPMs("rawWPM")]);
      }, 1000);
    }
  }, [test.state, trueWPMArray]);

  useEffect(() => {
    if (test.finished) {
      const convertedTrueWPMArray = trueWPMArray.map((item, index) => {
        return { x: index, y: parseFloat(item) };
      });

      const convertedRawWPMArray = rawWPMArray.map((item, index) => {
        return { x: index, y: parseFloat(item) };
      });

      setTrueWPMArray(convertedTrueWPMArray);
      setRawWPMArray(convertedRawWPMArray);
    }
  }, [test.finished]);

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
        pointStyle: false,

        // borderColor: "rgba(0,0,139,1)",
        // pointBackgroundColor: "rgba(0,0,139,1)",
        // pointBorderColor: "#fff",
        // pointHoverBackgroundColor: "#fff",
        // pointHoverBorderColor: "rgba(0,0,139,1)",
      },
      {
        label: "errors",
        data: testErrorChartData,
        showLine: true,
        fill: true,
        borderWidth: 1,
        pointStyle: false,
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "rgba(255,0,0,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,0,0,1)",
      },
    ],
  };

  const wpmData = {
    datasets: [
      {
        label: "true wpm",
        data: trueWPMArray.slice(1, trueWPMArray.length),
        cubicInterpolationMode: "monotone",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Changed to white
        showLine: true,
        fill: false,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)", // Changed to white
        pointBackgroundColor: "rgba(255, 255, 255, 1)", // Changed to white
        pointBorderColor: "#000", // Changed to black
        pointHoverBackgroundColor: "#000", // Changed to black
        pointHoverBorderColor: "rgba(255, 255, 255, 1)", // Changed to white
      },
      {
        label: "raw wpm",
        data: rawWPMArray.slice(1, rawWPMArray.length),
        cubicInterpolationMode: "monotone",
        showLine: true,
        fill: true,
        borderWidth: 1,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Changed to black
        borderColor: "rgba(0, 0, 0, 1)", // Changed to black
        pointBackgroundColor: "rgba(0, 0, 0, 1)", // Changed to black
        pointBorderColor: "#fff", // Kept as white for contrast
        pointHoverBackgroundColor: "#fff", // Kept as white for contrast
        pointHoverBorderColor: "rgba(0, 0, 0, 1)", // Changed to black
      },
    ],
  };

  const options = {
    animtion: false,
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
    <>
      {isAnalysis ? (
        <>
          <Scatter data={wpmData} options={options} />
        </>
      ) : (
        <></>
      )}
      <div
        style={{
          display: test.finished ? "flex" : "none",
          width: "70%",
          height: "35vh",
          background: "#09090920",
        }}>
        {!switchChart ? (
          <>
            <Scatter data={wpmData} options={options} />
          </>
        ) : (
          <>
            <Scatter data={data} options={options} />
          </>
        )}
        {/* <button onClick={() => setSwitchChart(!switchChart)}>
          Toggle Chart
        </button> */}
      </div>
    </>
  );
};

export default LineChart;
