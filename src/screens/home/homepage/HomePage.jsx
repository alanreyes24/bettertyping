// src/components/homepage/HomePage.jsx
import React from "react"; // Removed unused imports
import HeaderWrapper from "../../../components/header/HeaderWrapper";
import Test from "./components/test/Test";
import Landing from "./components/landing/Landing";
import { useState } from "react";

("use client");

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ScrollArea } from "@/components/ui/scroll-area";
import Heatmap from "./components/heatmap/Heatmap";
import Statistics from "./components/statistics/Statistics";

// let charttest = [
//   { second: "1", RawWPM: 186, TrueWPM: 80 },
//   { second: "2", RawWPM: 305, TrueWPM: 200 },
//   { second: "3", RawWPM: 237, TrueWPM: 120 },
//   { second: "4", RawWPM: 73, TrueWPM: 190 },
//   { second: "5", RawWPM: 209, TrueWPM: 130 },
//   { second: "6", RawWPM: 214, TrueWPM: 140 },
// ];

function HomePage({ user, handleUserChange, handleLogout }) {
  const [chartData, setChartData] = useState([
    { x: 0, y: 30 },
    { x: 1, y: 42 },
    { x: 2, y: 42 },
    { x: 3, y: 42 },
  ]);
  const [test, setTest] = useState({});

  return (
    <>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />
      <div className='bg-background w-full h-full'>
        <div className='flex flex-1 flex-col'>
          {/* TEST */}
          <Test
            user={user}
            sendData={(test) => {
              setTest(test);
              setChartData(test.words.chartData);
            }}
            AIMode={false}
          />

          <div className='space-y-4 justify-center text-center self-center mt-32'>
            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
              Analysis
            </h1>
            <p className='max-w-2xl self-center text-muted-foreground md:text-xl/relaxed'>
              An in depth look at your typing test. For a more detailed report,
              use our AI tool!
            </p>
          </div>

          {/* REPORT */}
          <div className='max-w-3xl lg:max-w-6xl grid grid-cols-2 lg:grid-cols-5 mt-6 gap-6 mx-auto'>
            {/* GRAPH */}
            <div className='w-full col-span-1 lg:col-span-3 mx-auto rounded-lg border bg-card p-6 shadow-sm'>
              <div className='space-y-1'>
                <h2 className='text-2xl font-bold'>Words Per Minute</h2>
                <p className='text-muted-foreground'>
                  Track your WPM over the length of the test.
                </p>
              </div>
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} />
                  <XAxis
                    testKey='second'
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
                    type='monotone'
                    dataKey='TrueWPM'
                    stackId='1'
                    stroke='hsl(143, 100%, 51%)'
                    fill='hsl(143, 100%, 51%)'
                    fillOpacity={0.15}
                  />
                  <Area
                    type='monotone'
                    dataKey='RawWPM'
                    stackId='0'
                    stroke='hsl(20, 100%, 47%)'
                    fill='hsl(34, 100%, 47%)'
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* STATISTICS */}

            <Statistics test={test} />
            {/* HEATMAP */}
            <Heatmap test={test} />

            {/* MISTAKES */}
            <div className='w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm'>
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <h2 className='text-2xl font-bold'>Mistakes</h2>
                  <p className='text-muted-foreground'>
                    List of all word errors
                  </p>
                </div>
              </div>

              {/* header */}
              <div className='grid grid-cols-3 gap-4 border-b mt-4 text-center'>
                <div className='text-lg font-medium'>Word</div>
                <div className='text-lg font-medium'>Typed</div>
                <div className='text-lg font-medium'>Count</div>
              </div>

              {/* list */}
              <ScrollArea className='h-64'>
                <div className='grid grid-cols-3 gap-2 text-center'>
                  <div>our</div>
                  <div>uor</div>

                  <div>124ms</div>
                  <div>given</div>
                  <div>givn</div>
                  <div>204ms</div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
