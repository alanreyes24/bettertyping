import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";
import Header from "../../components/header/Header";
import Replay from "../home/homepage/components/replay/Replay";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function History({ user, handleUserChange, handleLogout }) {
  const [chartData, setChartData] = useState([]);

  const [allUserTests, setAllUserTests] = useState([]);
  const [userHasTakenTests, setUserHasTakenTests] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentlySelectedTest, setCurrentlySelectedTest] = useState(null);

  function convertTimestampToTime(timestamp) {
    let time = new Date(timestamp);
    let stringifiedTime = time.toString();
    let splitDateString = stringifiedTime.split("GMT");
    let formattedDate = splitDateString[0].trim();

    return formattedDate;
  }

  async function retrieveAllTestsByUser() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/test/allByUser`,
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        setAllUserTests(response.data);
        setCurrentlySelectedTest(response.data[0]);
        setChartData(response.data[0].words.chartData);
      } else {
        setUserHasTakenTests(false);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setUserHasTakenTests(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveAllTestsByUser();
  }, []);

  const handleTestClick = (index) => {
    setCurrentlySelectedTest(allUserTests[index]);
    setChartData(allUserTests[index].words.chartData);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="load">
          <div className="progress"></div>
          <div className="progress"></div>
          <div className="progress"></div>
        </div>
      </div>
    );
  }

  if (!userHasTakenTests) {
    return (
      <>
        <Header
          passLoggedIn={handleUserChange}
          passLogout={handleLogout}
          user={user}
        />
        <div className="error-message">
          you need an account and have taken a test to use this page!
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      <div className="history-container">
        <div className="history-content-scrollable">
          {Array.isArray(allUserTests) && allUserTests.length > 0 ? (
            allUserTests.map((test, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleTestClick(index)}
              >
                <div>
                  {convertTimestampToTime(allUserTests[index].timestamp)}
                </div>
                <div className="details">
                  <div>wpm: {test.results.trueWPM}</div>
                  {test.settings.type == "words" && (
                    <div>length: {(test.settings.length || 0) / 10}</div>
                  )}
                  <div>accuracy: {test.results.accuracy}%</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-tests-message">
              you need to take a test to have history displayed
            </div>
          )}
        </div>

        {currentlySelectedTest && (
          <div className="test-display">
            <div className="test-information">
              <div className="test-card">
                <strong>type:</strong> {currentlySelectedTest.settings.type}
              </div>
              {currentlySelectedTest.settings.type == "words" && (
                <div className="test-card">
                  <strong>length:</strong>{" "}
                  {(currentlySelectedTest.settings.length || 0) / 10}
                </div>
              )}
              <div className="test-card">
                <strong>true wpm:</strong>{" "}
                {currentlySelectedTest.results.trueWPM}
              </div>
              <div className="test-card">
                <strong>raw wpm:</strong> {currentlySelectedTest.results.rawWPM}
              </div>
              <div className="test-card">
                <strong>accuracy:</strong>{" "}
                {currentlySelectedTest.results.accuracy}%
              </div>
            </div>
            <div className="mb-[5px]">
              <Replay test={currentlySelectedTest}> </Replay>
            </div>

            <div className="w-full col-span-1 lg:col-span-3 mx-auto rounded-lg border bg-card p-6 shadow-sm">
              <div style={{ width: "100%", height: "60%", marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height={170}>
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      testKey="second"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={2}
                      tickFormatter={(value) => value + 1}
                    />
                    {/* <YAxis /> */}
                    <YAxis
                      // type='number'
                      domain={["dataMin", "dataMax + 25"]}
                      tickLine={false}
                      axisLine={false}

                      // tickMargin={8}
                      // tickCount={8}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--secondary))",
                        border: 0,
                        borderRadius: "0.5rem",
                      }}
                      wrapperStyle={{ color: "white", borderRadius: "2rem" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="trueWPM"
                      stackId="1"
                      stroke="hsl(143, 100%, 51%)"
                      fill="hsl(143, 100%, 51%)"
                      fillOpacity={0.15}
                    />
                    <Area
                      type="monotone"
                      dataKey="rawWPM"
                      stackId="0"
                      stroke="hsl(20, 100%, 47%)"
                      fill="hsl(34, 100%, 47%)"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default History;
