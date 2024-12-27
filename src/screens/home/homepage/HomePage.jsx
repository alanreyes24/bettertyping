// src/components/homepage/HomePage.jsx
import React from "react"; // Removed unused imports
import HeaderWrapper from "../../../components/header/HeaderWrapper";
import Test from "./components/test/Test";
import Landing from "./components/landing/Landing";
import { useState } from "react";
import { useRef, useEffect } from "react";

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

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import OnboardingModal from "../homepage/components/onboarding/OnboardingModal";
import Replay from "./components/replay/Replay";

function HomePage({ user, handleUserChange, handleLogout, visited }) {
  const [chartData, setChartData] = useState([]);
  const [test, setTest] = useState({});
  const [onboardingType, setOnboardingType] = useState("intro");

  const container = useRef();

  useEffect(() => {
    if (test.state == 4) {
      console.log("3");
      setOnboardingType("analysis");
    }
  }, [test]);

  useGSAP(
    () => {
      const tl = gsap.timeline();
    }
    // { scope: container }
  );

  return (
    <>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      <div ref={container} className='bg-background w-full h-full'>
        <OnboardingModal
          user={user}
          type={onboardingType}
          onHide={() => {
            gsap.to(".intro", {
              opacity: 1,
              delay: 0.25,
              paddingTop: 0,
              duration: 0.5,
            });
            gsap.to(".test", {
              opacity: 1,
              duration: 0.25,
              delay: 0.25,
            });
          }}
        />

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

          {/* ANALYSIS */}




          <div className='analysis hidden opacity-0 mb-24'>
            <div className='space-y-4 justify-center text-center self-center mt-24 mx-auto max-w-3xl lg:max-w-6xl'>
              <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                Analysis
              </h1>
              <p className='max-w-2xl self-center text-center mx-auto text-muted-foreground md:text-xl/relaxed'>
                An in depth look at your typing test. For a more detailed
                report, use our AI tool!
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

              {test.state == 4 ? <Replay test={test} /> : <></>}



              {/* MISTAKES */}
              {/* <div className='w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm'>
                <div className='flex items-center justify-between'>
                  <div className='space-y-1'>
                    <h2 className='text-2xl font-bold'>Mistakes</h2>
                    <p className='text-muted-foreground'>
                      List of all word errors
                    </p>
                  </div>
                </div> */}

              {/* header */}
              {/* <div className='grid grid-cols-3 gap-4 border-b mt-4 text-center'>
                  <div className='text-lg font-medium'>Word</div>
                  <div className='text-lg font-medium'>Typed</div>
                  <div className='text-lg font-medium'>Count</div>
                </div> */}

              {/* list */}
              {/* <ScrollArea className='h-64'>
                  <div className='grid grid-cols-3 gap-2 text-center'>
                    <div>our</div>
                    <div>uor</div>

                    <div>124ms</div>
                    <div>given</div>
                    <div>givn</div>
                    <div>204ms</div>
                  </div>
                </ScrollArea>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
