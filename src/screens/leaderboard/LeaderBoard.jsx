import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderWrapper from "../../components/header/HeaderWrapper";
import "./LeaderBoard.css";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function LeaderBoard({ user, handleUserChange, handleLogout }) {
  const [pulledTests15AllTime, setPulledTests15AllTime] = useState([]);
  const [pulledTests30AllTime, setPulledTests30AllTime] = useState([]);
  const [pulledTests60AllTime, setPulledTests60AllTime] = useState([]);

  const [pulledWordsTests25Daily, setPulledWordsTests25Daily] = useState([]);

  useEffect(() => {
    retrieveTimeTestRankings(15);
    retrieveTimeTestRankings(30);
    retrieveTimeTestRankings(60);
    retreiveWordTestRankings(25)
  }, []);

  async function retrieveTimeTestRankings(duration) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/test/timeRankings?duration=${duration}&timeFrame=all-time`
      );
      if (duration === 15) {
        setPulledTests15AllTime(response.data);
      }
      if (duration === 30) {
        setPulledTests30AllTime(response.data);
      }
      if (duration === 60) {
        setPulledTests60AllTime(response.data);
      }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  async function retreiveWordTestRankings(count, time) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL
        }/test/wordRankings?count=${count}&timeFrame=all-time`
      );
      if (count === 25) {
        setPulledWordsTests25Daily(response.data);
      }
      // if (count === 50) {
      //   setPulledTests30AllTime(response.data);
      // }
      // if (count === 100) {
      //   setPulledTests60AllTime(response.data);
      // }
    } catch (error) {
      console.error("Error fetching rankings:", error.response);
    }
  }

  const currentTests15 = Array.isArray(pulledTests15AllTime)
    ? pulledTests15AllTime.slice(0, 20)
    : [];

  const currentTests30 = Array.isArray(pulledTests30AllTime)
    ? pulledTests30AllTime.slice(0, 20)
    : [];

  const currentTests60 = Array.isArray(pulledTests60AllTime)
    ? pulledTests60AllTime.slice(0, 20)
    : [];

  const currentTestsWords25 = Array.isArray(pulledWordsTests25Daily)
    ? pulledWordsTests25Daily.slice(0, 20)
    : [];

  return (
    <div className="">
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />


      {/* Leaderboard */}

      <div className='mt-16 space-y-4 justify-center text-center self-center mx-auto max-w-3xl lg:max-w-6xl'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          Leaderboard
        </h1>
        <p className='max-w-2xl self-center text-center mx-auto text-muted-foreground md:text-xl/relaxed'>
          Track your progress versus others!
        </p>
      </div>



      {/* PODIUM */}

      <div className='max-w-3xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-1 mt-6 mx-auto slide-in-left' >
        <div className='w-full col-span-1 lg:col-span-1 mx-auto rounded-lg shadow-sm'>
          <div className='space-y-1'>
            <h2 className='text-4xl font-bold'>Daily Podium</h2>
            <p className='text-muted-foreground'>
              25 Words
            </p>
          </div>

          <div className='grid grid-cols-3'>

            <div className='flex flex-col items-center justify-end slide-in-left'>
              <h3 className='text-lg font-medium text-center'>alan</h3>
              <div className='text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center'>
                <div className='bg-gray-400 shadow-md h-12 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl  font-semibold transition-colors '>
                  2nd
                </div>
                95 WPM
              </div>
            </div>

            <div className='flex flex-col items-center  justify-end slide-in-left'>
              <h3 className='text-lg font-medium text-center'>miles</h3>
              <div className='text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center'>
                <div className='bg-amber-300 shadow-md h-14 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl  font-semibold transition-colors '>
                  1st
                </div>
                100 WPM
              </div>
            </div>

            <div className='flex flex-col items-center justify-end slide-in-left'>
              <h3 className='text-lg font-medium text-center'>jessie</h3>
              <div className='text-3xl font-bold flex flex-col-reverse text-center self-center justify-center items-center'>
                <div className='bg-[#CC7748] shadow-md h-10 w-64 justify-center text-white inline-flex items-center rounded-t-2xl border text-xl  font-semibold transition-colors '>
                  3rd
                </div>
                75 WPM
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-3xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-1 mt-16 gap-6 mx-auto mb-64 slide-in-bottom-delay">

        <div className='space-y-1 flex justify-between'>
          <div>
            <h2 className='text-4xl font-bold'>All Time</h2>
            <p className='text-muted-foreground'>
              25 Words
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              disabled={true}
              onValueChange={(value) => {

              }}
              defaultValue="all-time"
            >
              <SelectTrigger
                onFocus={(e) => {
                }}
                id="type"
                aria-label="Select Time"
              >
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Select
              disabled={true}
              onValueChange={(v) => {

              }}
              defaultValue={2}
            >
              <SelectTrigger
                onFocus={(e) => {

                }}
                id="length"
                aria-label="Select Type"
              >
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>
                  Timed
                </SelectItem>
                <SelectItem value={2}>
                  Words
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              disabled={true}
              onValueChange={(v) => {

              }}
              defaultValue={1}
            >
              <SelectTrigger
                onFocus={(e) => {

                }}
                id="length"
                aria-label="Select Length"
              >
                <SelectValue placeholder="Select Length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>
                  25 Words
                </SelectItem>
                <SelectItem value={2}>
                  50 Words
                </SelectItem>
                <SelectItem value={3}>
                  100 Words
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table className="text-lg">
          <TableCaption>If you`&apos;`re on here, good job!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-bold text-xl">Place</TableHead>
              <TableHead className="text-left font-bold text-xl">Name</TableHead>
              <TableHead className="text-center font-bold text-xl">WPM</TableHead>
              <TableHead className="text-center font-bold text-xl">Accuracy</TableHead>
              {/* <TableHead className="text-center font-bold text-xl">Type</TableHead> */}
              <TableHead className="text-center font-bold text-xl">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTestsWords25.map((test, index) => (
              <TableRow className key={index}>
                <TableCell className="font-thin text-left pl-6">{index + 1}</TableCell>
                <TableCell className=" text-left">{test.username}</TableCell>
                <TableCell className="font-bold text-center">{test.results.trueWPM.toFixed(2)}</TableCell>
                <TableCell className="text-center">{test.results.accuracy.toFixed(2)}</TableCell>
                <TableCell className="font-thin text-center">{new Date(test.timestamp).toLocaleDateString("en-US").toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="leaderboard">
        <div className="leaderboard-container">
          <div className="leaderboard-section">
            <div className="section-title">15 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests15.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div className="section-title">30 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests30.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="leaderboard-section">
            <div className="section-title">60 Second Tests</div>
            <div className="leaderboard-list">
              {currentTests60.map((test, index) => (
                <div key={index} className="leaderboard-item">
                  <div className="leaderboard-rank">
                    {index + 1}:
                    <span className="leaderboard-username">
                      {test.username}
                    </span>
                  </div>
                  <div className="leaderboard-wpm">
                    true WPM: {test.results.trueWPM}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default LeaderBoard;

