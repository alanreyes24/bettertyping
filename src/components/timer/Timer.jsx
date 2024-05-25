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
      {test.timer.timeLeft != undefined
        ? (test.timer.timeLeft / 10).toFixed(1)
        : (0).toFixed(1)}
    </div>
  );
}

export default Timer;
