import React, { useEffect, useState } from "react";

function Timer({ settings, updateTimerInfo, start, game }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isActive, setIsActive] = useState(false);
  const [timerGoesUp, setTimerGoesUp] = useState(false); //is the timer counting up or down

  useEffect(() => {
    updateTimerInfo({
      timeLeft: game.isRunning ? timeLeft : settings.length,
      isActive: isActive,
      timerGoesUp: timerGoesUp,
    });
  }, [
    updateTimerInfo,
    timeLeft,
    isActive,
    timerGoesUp,
    settings,
    game.isRunning,
  ]);

  useEffect(() => {
    if (game.isRunning && !settings.visible) {
      setIsActive(start);
    }
    // if (start && settings.visible) {
    //     setIsActive(false)
    //     setTimeLeft(settings.length)
    //     updateTimerInfo({
    //         timeLeft: timeLeft,
    //         isActive: isActive,
    //         timerGoesUp: timerGoesUp
    //     });
    // }
  }, [start, settings]);

  //update the local timer state from the sent timer state (do after sent to game so we dont have game behind local state)
  useEffect(() => {
    setTimeLeft(game.timer.timeLeft);
  }, [game.timer]);

  //COMMENT AS A TEST (PROB NEED THIS)
  // useEffect(() => {
  //     if (settings.length != undefined)
  //         setTimeLeft(settings.length)
  // }, [settings.length])

  //if test type is a words test
  useEffect(() => {
    if (settings.type == "words")
      setTimeout(() => {
        setTimerGoesUp(true);
        setTimeLeft(0);
      });
  }, [settings.type]);

  useEffect(() => {
    if (game.isRunning && timeLeft > 0 && !timerGoesUp) {
      setTimeout(() => setTimeLeft(timeLeft - 1), 100);
    }

    if (game.isRunning && timerGoesUp) {
      setTimeout(() => setTimeLeft(timeLeft + 1), 100);
    }

    if (timeLeft == 0) {
      //SAME HERE as above
      // updateTimerInfo(updateTimerInfo.isActive = false);
      setIsActive(false);
    }
  }, [isActive, timeLeft, timerGoesUp, game.isRunning]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        fontWeight: "700",
      }}>
      {timeLeft != undefined ? (timeLeft / 10).toFixed(1) : (30.0).toFixed(1)}
    </div>
  );
}

export default Timer;
