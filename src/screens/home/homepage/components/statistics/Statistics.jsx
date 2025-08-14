import React from "react";

function Statistics({ test }) {
  const getPerformanceBadge = (category, value, percentile) => {
    let badgeText = "";
    let badgeStyle = "";

    // Check for Top 1% or Top 0.1%
    // if (percentile <= 1) {
    //   badgeText = `Top ${percentile}%`;
    //   badgeStyle = "bg-amber-300"; // Badge style for Top 1%
    // } else {
    // Badge assignment based on category and value
    if (category === "WPM") {
      if (value >= 80) {
        badgeText = "excellent";
        badgeStyle = "bg-amber-300";
      } else if (value >= 50) {
        badgeText = "above average";
        badgeStyle = "bg-green-400";
      } else if (value >= 30) {
        badgeText = "average";
        badgeStyle = "bg-green-600";
      } else {
        badgeText = "below average";
        badgeStyle = "bg-red-400";
      }
    } else if (category === "Accuracy") {
      if (value >= 100) {
        badgeText = "perfect";
        badgeStyle = "bg-amber-300";
      } else if (value >= 95) {
        badgeText = "above average";
        badgeStyle = "bg-green-400";
      } else if (value >= 70) {
        badgeText = "average";
        badgeStyle = "bg-green-600";
      } else {
        badgeText = "below average";
        badgeStyle = "bg-red-400";
      }
    } else if (category === "Mistakes") {
      if (value <= 0) {
        badgeText = "perfect";
        badgeStyle = "bg-amber-300";
      } else if (value <= 5) {
        badgeText = "above average";
        badgeStyle = "bg-green-400";
      } else if (value <= 10) {
        badgeText = "average";
        badgeStyle = "bg-green-600";
      } else {
        badgeText = "below average";
        badgeStyle = "bg-red-400";
      }
    }

    return (
      <div
        className={`${badgeStyle} h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
      >
        {badgeText}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">statistics</h2>
          <p className="text-muted-foreground">
            review your performance and get insights
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
              <h3 className="text-lg font-medium">words per minute</h3>
              <p className="text-xs text-muted-foreground">x̄ typing speed</p>
            </div>

            <div className="text-3xl font-bold flex flex-col-reverse text-center justify-end">
              {test.results != undefined ? (
                getPerformanceBadge("WPM", test.results.trueWPM, 1)
              ) : (
                <></>
              )}
              {test.results != undefined ? test.results.trueWPM : 142.82}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl lg:text-lg font-medium">accuracy</h3>
              <p className="text-xs text-muted-foreground">
                % of correct letters
              </p>
            </div>
            <div className="text-4xl font-bold flex-col-reverse text-center flex justify-center">
              {test.results != undefined ? (
                getPerformanceBadge("Accuracy", test.results.accuracy, 1)
              ) : (
                <></>
              )}
              {test.results != undefined ? test.results.accuracy : 98.8}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">mistakes</h3>
              <p className="text-xs text-muted-foreground">
                # of mistakes made
              </p>
            </div>
            <div className="text-4xl font-bold flex flex-col-reverse text-center justify-center">
              {test.results != undefined ? (
                getPerformanceBadge("Mistakes", test.results.mistakes, 1)
              ) : (
                <></>
              )}
              {test.results != undefined ? test.results.mistakes : 11}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
