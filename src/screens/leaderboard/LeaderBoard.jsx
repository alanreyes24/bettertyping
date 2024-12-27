import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderWrapper from "../../components/header/HeaderWrapper";
import "./LeaderBoard.css";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function LeaderBoard({ user, handleUserChange, handleLogout }) {
  // State variables for selections
  const [timeFrame, setTimeFrame] = useState("daily");
  const [testType, setTestType] = useState("Words");
  const [testLength, setTestLength] = useState(25);
  const [testData, setTestData] = useState([]);

  const wordCounts = [25, 50, 100];
  const durations = [15, 30, 60];

  // Fetch data when selections change
  useEffect(() => {
    console.log(
      "useEffect triggered with testType:",
      testType,
      "testLength:",
      testLength,
      "timeFrame:",
      timeFrame
    );
    if (testType === "Words") {
      retrieveWordTestRankings(testLength, timeFrame);
    } else {
      retrieveTimeTestRankings(testLength, timeFrame);
    }
  }, [testType, testLength, timeFrame]);

  // Reset test length when test type changes
  useEffect(() => {
    if (testType === "Words") {
      setTestLength(25);
    } else {
      setTestLength(15);
    }
  }, [testType]);

  // Log testData updates
  useEffect(() => {
    console.log("Updated testData:", testData);
  }, [testData]);

  // Fetch word test rankings
  async function retrieveWordTestRankings(count, time) {
    console.log(
      "Fetching word rankings with count:",
      count,
      "and timeFrame:",
      time
    );
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/test/wordRankings?count=${count}&timeFrame=${time}`
      );
      console.log("API response data:", response.data);
      setTestData(response.data.slice(0, 20)); // Limit to top 20
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  // Fetch time test rankings
  async function retrieveTimeTestRankings(duration, timeFrame) {
    console.log(
      "Fetching time rankings with duration:",
      duration,
      "and timeFrame:",
      timeFrame
    );
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/test/timeRankings?duration=${duration}&timeFrame=${timeFrame}`
      );
      console.log("API response data:", response.data);
      setTestData(response.data.slice(0, 20)); // Limit to top 20
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  function getTopThreeUsers(users) {
    if (!Array.isArray(users)) return [];
    let sortedUsers = [...users].sort(
      (a, b) => b.results.trueWPM - a.results.trueWPM
    );
    return sortedUsers.slice(0, 3);
  }

  const topUsers = getTopThreeUsers(testData);

  return (
    <div className="">
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      {/* Leaderboard */}

      <div className="mt-16 space-y-4 justify-center text-center self-center mx-auto max-w-3xl lg:max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Leaderboard
        </h1>
        <p className="max-w-2xl self-center text-center mx-auto text-muted-foreground md:text-xl/relaxed">
          Track your progress versus others!
        </p>
      </div>

      {/* PODIUM */}

      <div className="max-w-3xl lg:max-w-6xl grid grid-cols-3 lg:px-44 mt-6 mx-auto slide-in-left ">
        {/* Silver - Second place on the left */}
        {topUsers[1] ? (
          <div className="flex flex-col items-center justify-end">
            <h3 className="text-lg font-medium text-center">
              {topUsers[1].username}
            </h3>
            <div className="text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center">
              <div className="bg-gray-400 shadow-md h-12 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl font-semibold transition-colors">
                2nd
              </div>
              {topUsers[1].results.trueWPM.toFixed(2)}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* Gold - First place in the middle */}
        {topUsers[0] && (
          <div className="flex flex-col items-center justify-end">
            <h3 className="text-lg font-medium text-center">
              {topUsers[0].username}
            </h3>
            <div className="text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center">
              <div className="bg-amber-300 shadow-md h-14 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl font-semibold transition-colors">
                1st
              </div>
              {topUsers[0].results.trueWPM.toFixed(2)}
            </div>
          </div>
        )}

        {/* Bronze - Third place on the right */}
        {topUsers[2] ? (
          <div className="flex flex-col items-center justify-end">
            <h3 className="text-lg font-medium text-center">
              {topUsers[2].username}
            </h3>
            <div className="text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center">
              <div className="bg-[#CC7748] shadow-md h-10 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl font-semibold transition-colors">
                3rd
              </div>
              {topUsers[2].results.trueWPM.toFixed(2)}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* TABLE */}
      <div className="max-w-3xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-1 mt-16 gap-6 mx-auto mb-64 slide-in-bottom-delay">
        <div className="space-y-1 flex justify-between">
          <div>
            <h2 className="text-4xl font-bold">
              {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            </h2>
            <p className="text-muted-foreground">
              {testType === "Words"
                ? `${testLength} Words`
                : `${testLength} Seconds`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) => setTimeFrame(value)}
              value={timeFrame}
            >
              <SelectTrigger id="time" aria-label="Select Time">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setTestType(v)} value={testType}>
              <SelectTrigger id="type" aria-label="Select Type">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Timed">Timed</SelectItem>
                <SelectItem value="Words">Words</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(v) => setTestLength(Number(v))}
              value={testLength.toString()}
            >
              <SelectTrigger id="length" aria-label="Select Length">
                <SelectValue placeholder="Select Length" />
              </SelectTrigger>
              <SelectContent>
                {testType === "Words"
                  ? wordCounts.map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} Words
                    </SelectItem>
                  ))
                  : durations.map((duration) => (
                    <SelectItem key={duration} value={duration.toString()}>
                      {duration} Seconds
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table className="text-lg">
          <TableCaption>If you&apos;re on here, good job!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-bold text-xl">
                Place
              </TableHead>
              <TableHead className="text-left font-bold text-xl">
                Name
              </TableHead>
              <TableHead className="text-center font-bold text-xl">
                WPM
              </TableHead>
              <TableHead className="text-center font-bold text-xl">
                Accuracy
              </TableHead>
              <TableHead className="text-center font-bold text-xl">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test, index) => (
              <TableRow key={index}>
                <TableCell className="font-thin text-left pl-6">
                  {index + 1}
                </TableCell>
                <TableCell className="text-left">{test.username}</TableCell>
                <TableCell className="font-bold text-center">
                  {test.results.trueWPM.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {test.results.accuracy.toFixed(2)}%
                </TableCell>
                <TableCell className="font-thin text-center">
                  {new Date(test.timestamp)
                    .toLocaleDateString("en-US")
                    .toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LeaderBoard;
