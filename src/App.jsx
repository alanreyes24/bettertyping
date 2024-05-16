import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";
import Settings from "./components/settings/Settings";

function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [timerLength, setTimerLength] = useState(30);
  const [timerZero, setTimerZero] = useState(false);
  const [isTextFinished, setIsTextFinished] = useState(false);
  const [correctLetters, setCorrectLetters] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerLength);
  const [WPM, setWPM] = useState(0);


  useEffect(() => {
    setWPM((60 * correctWords) / (timerLength - timeLeft));
  }, [WPM, correctWords, timerLength, timeLeft]);

  const startTest = () => {
    console.log("starting test");
    setTimerLength(timerLength);
    setTimerZero(false);
    setStartTimer(true);
  };

  const stopTest = () => {
    console.log("stopping test");
    setStopTimer(true);
    //timeleft is still zero until timer sends it (obviously) it takes a second to come in
    // console.log('TIME LEFT' + timeLeft) doesnt work its still 0

    setStartTimer(false);
  };

  if (timerZero) {
    console.log('timerzero')
    setTimeLeft(0);
    stopTest();
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: 'center'
      }}
    >
      <div style={{ alignSelf: 'center' }}>


        <Settings />


        <Timer
          time={timerLength}
          start={startTimer}
          stop={stopTimer}
          onTimerZero={() => {
            stopTest();
            setTimerZero(!timerZero);
          }}
          passTimeLeft={setTimeLeft}
        />

        {isTextFinished ? <>FINISHED YES</> : <>FINISHED NO</>}
        {" LETTERS " + correctLetters}
        {" WORDS " + correctWords}
        {WPM < Infinity ? <>{"WPM: " + WPM}</> : <>{"WPM: 0"}</>}
      </div>


      <Cursor />
      <TextArea
        passCorrectLetters={setCorrectLetters}
        passCorrectWords={setCorrectWords}
        onTextStarted={() => {
          setStartTimer(true);
        }}
        onTextFinished={() => {
          setIsTextFinished(!isTextFinished);
          stopTest();
        }}
      />

    </div>
  );
}

export default App;
