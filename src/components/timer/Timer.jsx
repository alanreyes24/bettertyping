import React, { useEffect, useState } from "react";

function Timer({ test }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        fontWeight: "700",
      }}>
      {test.settings.type == "words"
        ? //timeleft cant be set to 0 because thats what we look for when end tests,
          //so we start it at the length it was and minus it later
          ((test.timer.timeLeft - test.settings.length) / 10).toFixed(0)
        : test.timer.timeLeft != undefined
        ? (test.timer.timeLeft / 10).toFixed(0)
        : (0).toFixed(0)}
    </div>
  );
}

export default Timer;
