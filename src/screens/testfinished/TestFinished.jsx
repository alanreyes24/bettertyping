import React, { useEffect, useState } from "react";
import EndTest from "../home/homepage/components/endtest/EndTest";
import axios from "axios";

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

function TestFinished() {



async function retrieveMostRecentChartData() {

    const token = localStorage.getItem("auth-token");
    console.log(token)

    const response = await axios.get("http://localhost:3090/test/chartData", {
        headers: {
            "token": token,
          },
    });

    console.log(response)




}


    
      const wpmData = {
        datasets: [
          {
            label: "true wpm",
            // data: trueWPMArray.slice(1, trueWPMArray.length), // CHANGE 
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
            // data: rawWPMArray.slice(1, rawWPMArray.length), // CHANGE 
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
        animation: false,
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


    return(
        <>
        
        <div> Hello </div>
        <button onClick={retrieveMostRecentChartData}> retrieveMostRecent Test </button>
        
        </>
        
    )
    
}

export default TestFinished;