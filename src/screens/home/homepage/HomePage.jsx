// src/components/homepage/HomePage.jsx
import React from "react"; // Removed unused imports
import HeaderWrapper from "../../../components/header/HeaderWrapper";
import Test from "./components/test/Test";
import Landing from "./components/landing/Landing";

"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { Badge } from "@/components/ui/badge"

const chartData = [
  { second: "1", RawWPM: 186, TrueWPM: 80 },
  { second: "2", RawWPM: 305, TrueWPM: 200 },
  { second: "3", RawWPM: 237, TrueWPM: 120 },
  { second: "4", RawWPM: 73, TrueWPM: 190 },
  { second: "5", RawWPM: 209, TrueWPM: 130 },
  { second: "6", RawWPM: 214, TrueWPM: 140 },
]

function HomePage({ user, handleUserChange, handleLogout }) {
  return (
    <>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />
      <div className="bg-background w-full h-full">
        <div className="flex flex-1 flex-col">


          {/* INTRO */}
          <div className="space-y-4 justify-center text-center self-center mt-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Test Your Typing Speed</h1>
            <p className="max-w-2xl self-center text-muted-foreground md:text-xl/relaxed">
              Take a short typing test and we will match you with an individualized AI program to improve your skils!
            </p>
          </div>




          {/* TEST AREA */}
          <div className="w-full mt-16 mx-auto max-w-3xl lg:max-w-5xl rounded-lg border bg-card p-6 shadow-sm">
            <Test user={user} AIMode={false} />
          </div>





          {/* REPORT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mt-16 gap-6 mx-auto">

            {/* GRAPH */}
            <div className="w-full mx-auto rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">WPM Graph</h2>
                <p className="text-muted-foreground">Track your WPM over the length of the test. </p>

              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="second"
                    tickLine={true}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={3}
                  />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--secondary))', border: 0, borderRadius: "0.5rem" }} wrapperStyle={{ color: "white", borderRadius: "2rem" }} />
                  <Area
                    type="monotone"
                    dataKey="TrueWPM"
                    stackId="1"
                    stroke="hsl(143, 100%, 51%)"
                    fill="hsl(143, 100%, 51%)"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="RawWPM"
                    stackId="1"
                    stroke="hsl(34, 100%, 47%"
                    fill="hsl(34, 100%, 47%"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>

            </div>


            {/* STATISTICS */}
            <div className="w-full mx-auto rounded-lg border bg-card p-6 h shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Statistics</h2>
                  <p className="text-muted-foreground">Review your typing performance and get insights.</p>
                </div>
                {/* <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    View Report
                  </button>
                </div> */}
              </div>

              <div className="mt-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Words Per Minute</h3>
                      <p className="text-muted-foreground">Your average typing speed</p>
                    </div>

                    <div className="text-4xl font-bold flex flex-col-reverse text-center justify-end">  <Badge className="bg-amber-300 h-6 w-32 justify-center">Top 0.1%</Badge>142.8</div>

                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Accuracy</h3>
                      <p className="text-muted-foreground">Your typing accuracy</p>
                    </div>
                    <div className="text-4xl font-bold flex-col-reverse text-center flex justify-center">  <Badge className="bg-green-400 h-6 w-32 justify-center ">Above Average</Badge>92%</div>
                  </div>


                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Mistakes</h3>
                      <p className="text-muted-foreground">Number of mistakes made</p>
                    </div>
                    <div className="text-4xl font-bold flex flex-col-reverse text-center justify-center">  <Badge className="bg-red-400 h-6  w-32 justify-center">Below Average</Badge>12</div>

                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mx-auto rounded-lg border bg-card p-6 h shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Statistics</h2>
                  <p className="text-muted-foreground">Review your typing performance and get insights.</p>
                </div>
                {/* <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    View Report
                  </button>
                </div> */}
              </div>

              <div className="mt-6">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Words Per Minute</h3>
                      <p className="text-muted-foreground">Your average typing speed</p>
                    </div>

                    <div className="text-4xl font-bold flex flex-col-reverse text-center justify-end">  <Badge className="bg-amber-300 h-6 w-32 justify-center">Top 0.1%</Badge>142.8</div>

                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Accuracy</h3>
                      <p className="text-muted-foreground">Your typing accuracy</p>
                    </div>
                    <div className="text-4xl font-bold flex-col-reverse text-center flex justify-center">  <Badge className="bg-green-400 h-6 w-32 justify-center ">Above Average</Badge>92%</div>
                  </div>


                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Mistakes</h3>
                      <p className="text-muted-foreground">Number of mistakes made</p>
                    </div>
                    <div className="text-4xl font-bold flex flex-col-reverse text-center justify-center">  <Badge className="bg-red-400 h-6  w-32 justify-center">Below Average</Badge>12</div>

                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* <div className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Free</h3>
                  <p className="text-sm text-muted-foreground">1 AI test per day</p>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span>AI Tests per Day</span>
                      <span>1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Advanced Analytics</span>
                      <span>Not Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Catered Tests</span>
                      <span>Not Included</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                    Sign Up for Free
                  </button>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Paid</h3>
                  <p className="text-sm text-muted-foreground">Up to 30 AI tests per day</p>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span>AI Tests per Day</span>
                      <span>Up to 30</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Advanced Analytics</span>
                      <span>Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Catered Tests</span>
                      <span>Included</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-6">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
