import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";
import Settings from "./components/settings/Settings";

function App() { // organized all of the states to be cleaner and follow conventions


  // condensed "startTimer" and "stopTimer" to be one state "isTimerActive"

  const [isTimerActive, setIsTimerActive] = useState(false)

  const [isTimerZero, setIsTimerZero] = useState(false); // changed "isTimerZero" to be "isTimerZero"
  const [isTextFinished, setIsTextFinished] = useState(false); // this was named correctly good job

  const [numOfCorrectLetters, setNumOfCorrectLetters] = useState(0); // changed from "correctLetters" to "numOfCorrectLetters"
  const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // changed from "correctWords" to "numOfCorrectWords"

  const [timerLength, setTimerLength] = useState(30); // going to need you to explain the relationship between "timerLength" and "timeLeft" more
  const [timeLeft, setTimeLeft] = useState(timerLength);

  const [currentTestWPM, setCurrentTestWPM] = useState(0); // changed from "WPM" to "currentTestWPM"


  useEffect(() => {

    setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft)) // i'm just not going to touch this
  }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);


  const startTest = () => {
    console.log("starting test");
    console.log(timerLength)
    setTimerLength(timerLength);
    setIsTimerZero(false);
    setIsTimerActive(true);
  };

  const stopTest = () => {


    setIsTimerActive(true)
    //timeleft is still zero until timer sends it (obviously) it takes a second to come in
    // console.log('TIME LEFT' + timeLeft) doesnt work its still 0

    setIsTimerActive(false);


  };

  if (isTimerZero) {

    stopTest();
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: 'center',
        // overflowY: 'hidden'
      }}
    >

      <div style={{ alignSelf: 'center' }}>

        <Settings />

        <Timer
          time={timerLength}
          start={isTimerActive}
          stop={isTimerActive}
          onTimerZero={() => {
            setIsTimerZero(!isTimerZero);
          }}
          passTimeLeft={setTimeLeft}
        />

        {isTextFinished ? <>FINISHED YES</> : <>FINISHED NO</>}
        {" LETTERS " + numOfCorrectLetters}
        {" WORDS " + numOfCorrectWords}
        {currentTestWPM < Infinity ? <>{"WPM: " + currentTestWPM}</> : <>{"WPM: 0"}</>}


      </div>

      <Cursor />
      <TextArea
        passCorrectLetters={setNumOfCorrectLetters}
        passCorrectWords={setNumOfCorrectWords}
        onTextStarted={() => {
          setIsTimerActive(true)

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
