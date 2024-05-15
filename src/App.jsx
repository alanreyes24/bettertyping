import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [timerLength, setTimerLength] = useState(30.0);
  const [timerZero, setTimerZero] = useState(false);
  const [isTextFinished, setIsTextFinished] = useState(false);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerLength);
  const [WPM, setWPM] = useState(0);

  // const getCorrect = (total) => {
  //   console.log("TOTAL" + total)
  // }

  useEffect(() => {
    setWPM((600 * correctWords) / (timerLength - timeLeft))
  }, [WPM, correctWords, timerLength, timeLeft]);

  const startTest = () => {
    console.log("starting test");
    setTimerLength(timerLength);
    setTimerZero(false);
    setStartTimer(true);
  };

  const stopTest = () => {

    setStopTimer(true)
    //timeleft is still zero until timer sends it (obviously) it takes a second to come in
    // console.log('TIME LEFT' + timeLeft) doesnt work its still 0

    setStartTimer(false);


  };

  if (timerZero) {
    stopTest();
  }


  return (
    <div style={{ overflow: "hidden" }}>
      <button
        onClick={() => {
          setStartTimer(false);
          console.log("set timer to 15");
          setTimerLength(15);
        }}
      >
        15
      </button>
      <button
        onClick={() => {
          setStartTimer(false);
          setTimerLength(30);
        }}
      >
        30
      </button>
      <button
        onClick={() => {
          setStartTimer(false);
          setTimerLength(60);
        }}
      >
        60
      </button>
      <button
        onClick={() => {
          console.log("start");
          startTest();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          console.log("stop");
          stopTest();
        }}
      >
        Stop
      </button>
      <Timer
        time={timerLength}
        start={startTimer}
        stop={stopTimer}
        onTimerZero={() => {
          setTimerZero(!timerZero);
        }}
        passTimeLeft={setTimeLeft}
      />

      {isTextFinished ? <>FINISHED YES</> : <>FINISHED NO</>}
      {" LETTERS " + correctLetters}
      {" WORDS " + correctWords}
      {WPM < Infinity ? <>{"WPM: " + WPM}</> : <>{"WPM: 0"}</>}
      {/* <Cursor /> */}
      <TextArea
        passCorrectLetters={setCorrectLetters}
        passCorrectWords={setCorrectWords}
        onTextStarted={() => {
          setStartTimer(true)
        }}
        onTextFinished={() => {
          setIsTextFinished(!isTextFinished)
          stopTest();
        }}
      />
    </div>
  );
}

export default App;
