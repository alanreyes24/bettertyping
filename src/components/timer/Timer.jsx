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
        ? (test.timer.timeLeft / 10).toFixed(0)
        : (0).toFixed(0)}
    </div>
  );
}

export default Timer;
