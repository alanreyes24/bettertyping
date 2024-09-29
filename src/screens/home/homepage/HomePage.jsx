// src/components/homepage/HomePage.jsx
import React from "react"; // Removed unused imports
import HeaderWrapper from "../../../components/header/HeaderWrapper";
import Test from "./components/test/Test";
import Landing from "./components/landing/Landing";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScrollArea } from "@/components/ui/scroll-area"

const chartData = [
  { second: "1", RawWPM: 186, TrueWPM: 80 },
  { second: "2", RawWPM: 305, TrueWPM: 200 },
  { second: "3", RawWPM: 237, TrueWPM: 120 },
  { second: "4", RawWPM: 73, TrueWPM: 190 },
  { second: "5", RawWPM: 209, TrueWPM: 130 },
  { second: "6", RawWPM: 214, TrueWPM: 140 },
];

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




          {/* TEST */}
          <Test user={user} AIMode={false} />


          <div className="space-y-4 justify-center text-center self-center mt-32">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Analysis
            </h1>
            <p className="max-w-2xl self-center text-muted-foreground md:text-xl/relaxed">
              An in depth look at your typing test. For a more detailed report, use our AI tool!
            </p>
          </div>

          {/* REPORT */}
          <div className="max-w-3xl lg:max-w-6xl grid grid-cols-2 lg:grid-cols-5 mt-6 gap-6 mx-auto">
            {/* GRAPH */}
            <div className="w-full col-span-1 lg:col-span-3 mx-auto rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Words Per Minute</h2>
                <p className="text-muted-foreground">
                  Track your WPM over the length of the test.
                </p>
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
                    stroke="hsl(34, 100%, 47%)"
                    fill="hsl(34, 100%, 47%)"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* STATISTICS */}
            <div className="w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Statistics</h2>
                  <p className="text-muted-foreground">
                    Review your typing performance and get insights.
                  </p>
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
                      <p className="text-xs text-muted-foreground">
                        Your average typing speed
                      </p>
                    </div>

                    <div className="text-3xl font-bold flex flex-col-reverse text-center justify-end">
                      <div className="bg-amber-300 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Top 0.1%
                      </div>
                      142.8
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl lg:text-lg font-medium">
                        Accuracy
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Percentage of correct letters
                      </p>
                    </div>
                    <div className="text-4xl font-bold flex-col-reverse text-center flex justify-center">
                      <div className="bg-green-400 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Above Average
                      </div>
                      92%
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Mistakes</h3>
                      <p className="text-xs text-muted-foreground">
                        Number of mistakes made
                      </p>
                    </div>
                    <div className="text-4xl font-bold flex flex-col-reverse text-center justify-center">
                      <div className="bg-red-400 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Below Average
                      </div>
                      12
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HEATMAP */}

            <div className="w-full mx-auto col-span-2 lg:col-span-5 rounded-lg border bg-card p-6 h shadow-sm space-y-4 justify-center flex flex-col">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Heatmap</h2>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    A dynamic map of your keystrokes. Hover over a key to see
                    detailed statistics
                  </p>

                  <div className="">
                    <Select
                      onValueChange={(value) => {
                        console.log(value);
                      }}
                      defaultValue="qwerty"
                    >
                      <SelectTrigger id="status" aria-label="Select Layout">
                        <SelectValue placeholder="Select Layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qwerty">Qwerty</SelectItem>
                        <SelectItem value="dvorak">Dvorak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* KEYBOARD */}
              <div>
                <div className="grid text-white gap-3 font-bold grid-rows-3 mt-2">
                  <div className="flex flex-row space-x-4 justify-center">
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      Q
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      W
                    </div>
                    <div className="bg-[#ff6753f0] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      E
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      R
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      T
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      Y
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      U
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      I
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      O
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      P
                    </div>
                  </div>
                  <div className="flex flex-row space-x-4 justify-center">
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      A
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      S
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      D
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      F
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      G
                    </div>
                    <div className="bg-[#ff6753f0] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      H
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      J
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      K
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      L
                    </div>
                  </div>
                  <div className="flex flex-row -ml-16 space-x-4 justify-center">
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      Z
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      X
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      C
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      V
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      B
                    </div>
                    <div className="bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      N
                    </div>
                    <div className="bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105">
                      M
                    </div>
                  </div>
                </div>
                {/* ATLAS / MEANINGS */}
                <div className="flex flex-row space-x-8 justify-center mt-2">
                  <div className="flex text-lg text-muted-foreground">
                    <div className="w-4 h-4 border bg-[#ff675310] self-center mr-2"></div>
                    Low &lt; 2
                  </div>
                  <div className="flex text-lg text-muted-foreground">
                    <div className="w-4 h-4 border bg-[#ff675340] self-center mr-2"></div>
                    Medium 3-5
                  </div>
                  <div className="flex text-lg text-muted-foreground">
                    <div className="w-4 h-4 border bg-[#ff6753f0] self-center mr-2"></div>
                    High &gt; 6
                  </div>
                </div>
              </div>

              <div className="w-64 self-center">
                <Select
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                  defaultValue="incorrect"
                >
                  <SelectTrigger id="heatmap" aria-label="Select Filter">
                    <SelectValue placeholder="Select Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incorrect">Incorrect Letters</SelectItem>
                    <SelectItem value="correct">Correct Letters</SelectItem>

                    <SelectItem value="largest">Largest Delay</SelectItem>
                    <SelectItem value="smallest">Smallest Delay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* MISTAKES */}
            <div className="w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Mistakes</h2>
                  <p className="text-muted-foreground">
                    List of all word errors
                  </p>
                </div>
              </div>


              {/* header */}
              <div className="grid grid-cols-3 gap-4 border-b mt-4 text-center">

                <div className="text-lg font-medium">Word</div>
                <div className="text-lg font-medium">Typed</div>
                <div className="text-lg font-medium">Count</div>
              </div>

              {/* list */}
              <ScrollArea className="h-64">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>our</div>
                  <div >uor</div>

                  <div>124ms</div>
                  <div>given</div>
                  <div>givn</div>
                  <div>204ms</div>

                </div>

              </ScrollArea>

            </div>


          </div>
        </div>
      </div >

    </>
  );
}

export default HomePage;
