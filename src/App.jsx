import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";
import Settings from "./components/settings/Settings";
import Header from "./components/header/Header";
import Login from "./components/login/Login";

function App() {
  // organized all of the states to be cleaner and follow conventions

  // condensed "startTimer" and "stopTimer" to be one state "isTimerActive"

  const [isTimerActive, setIsTimerActive] = useState(false);

  const [isTimerZero, setIsTimerZero] = useState(false); // changed "isTimerZero" to be "isTimerZero"
  const [isTextFinished, setIsTextFinished] = useState(false); // this was named correctly good job

  const [numOfCorrectLetters, setNumOfCorrectLetters] = useState(0); // changed from "correctLetters" to "numOfCorrectLetters"
  const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // changed from "correctWords" to "numOfCorrectWords"

  const [timerLength, setTimerLength] = useState(30); // going to need you to explain the relationship between "timerLength" and "timeLeft" more
  const [timeLeft, setTimeLeft] = useState(timerLength);

  const [currentTestWPM, setCurrentTestWPM] = useState(0); // changed from "WPM" to "currentTestWPM"

  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false);

  const [hideSettings, setHideSettings] = useState();
  const [settings, setSettings] = useState({});

// ALAN WORKSPACE

const [timerInfo, setTimerInfo] = useState({})










  //makes the cursor blink if the test is not started and textarea is selected
  useEffect(() => {
    // console.log(isTimerActive);
    if (shouldUpdateCursor && !isTimerActive) {
      document.getElementById("cursor").classList.add("cursorBlink");
    } else document.getElementById("cursor").classList.remove("cursorBlink");
  }, [shouldUpdateCursor, isTimerActive]);




useEffect(() => {
  console.log(timerInfo);
}, [timerInfo]);
//


  useEffect(() => {
    setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft)); // i'm just not going to touch this
  }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  // const startTest = () => {
  //   console.log("starting test");
  //   console.log(timerLength);
  //   setTimerLength(timerLength);
  //   setIsTimerZero(false);
  //   setIsTimerActive(true);
  // };

  const stopTest = () => {
    setIsTimerActive(true);
    //timeleft is still zero until timer sends it (obviously) it takes a second to come in
    // console.log('TIME LEFT' + timeLeft) doesnt work its still 0

    setIsTimerActive(false);
  };

  if (isTimerZero) {
    stopTest();
  }

  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <div
          style={{ display: "flex", alignSelf: "center", marginTop: "5rem" }}
        >
          <Settings hideModal={hideSettings} passSettings={setSettings} />
        </div>

        <div style={{ justifyContent: "center", alignSelf: "center" }}>
          <Timer
            passTimerInfo={timerInfo}
            passSetTimerInfo={setTimerInfo}
          />

          {isTextFinished ? <>FINISHED YES</> : <>FINISHED NO</>}
          {" LETTERS " + numOfCorrectLetters}
          {" WORDS " + numOfCorrectWords}
          {currentTestWPM < Infinity ? (
            <>{"WPM: " + currentTestWPM}</>
          ) : (
            <>{"WPM: 0"}</>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            transition: "all .15s ease-out",
          }}
        >
          <Cursor shouldUpdate={shouldUpdateCursor} />
           <Login />
          <TextArea
            settings={settings}
            passCorrectLetters={setNumOfCorrectLetters}
            passCorrectWords={setNumOfCorrectWords}
            onTextStarted={() => {
              setIsTimerActive(true);
              setShouldUpdateCursor(true);
            }}
            onTextFinished={() => {
              setIsTextFinished(!isTextFinished);
              stopTest();
              setShouldUpdateCursor(false);
            }}
            onFocus={() => {
              setShouldUpdateCursor(true);
              setHideSettings(true);
            }}
            onFocusLost={() => {
              setHideSettings(false);
              setShouldUpdateCursor(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
