// src/components/homepage/HomePage.jsx
import React, { useState } from "react";
import Header from "../../../components/header/Header";
import Test from "./components/test/Test";
import Replay from "./components/replay/Replay";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Heatmap from "./components/heatmap/Heatmap";
import Statistics from "./components/statistics/Statistics";

function HomePage({ user, handleUserChange, handleLogout }) {
  const [chartData, setChartData] = useState([]);
  const [test, setTest] = useState({});

  return (
    <>
      <Header
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
          />

          {/* ANALYSIS */}
          <div className='analysis hidden opacity-0 mb-24'>
            <div className='space-y-4 justify-center text-center self-center mt-24 mx-auto max-w-3xl lg:max-w-6xl'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                analysis
              </h1>
              <p className='max-w-2xl self-center text-center mx-auto text-muted-foreground md:text-xl/relaxed'>
                here's an indepth look on how you did
              </p>
            </div>

            {/* REPORT */}
            <div className='max-w-3xl lg:max-w-6xl grid grid-cols-2 lg:grid-cols-5 mt-6 gap-6 mx-auto'>
              {/* GRAPH */}
              <div className='w-full col-span-1 lg:col-span-3 mx-auto rounded-lg border bg-card p-6 shadow-sm'>
                <div className='space-y-1 mb-5'>
                  <h2 className='text-2xl font-bold'>words per minute</h2>
                  <p className='text-muted-foreground'>
                    track your WPM over the length of the test
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
                      dataKey='trueWPM'
                      stackId='1'
                      stroke='hsl(143, 100%, 51%)'
                      fill='hsl(143, 100%, 51%)'
                      fillOpacity={0.15}
                    />
                    <Area
                      type='monotone'
                      dataKey='rawWPM'
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

              {/* REPLAY */}
              {test.state >= 4 ? <Replay test={test} /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
