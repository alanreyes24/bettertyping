import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect, useCallback } from "react";
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

  const [timerLength, setTimerLength] = useState(300); // going to need you to explain the relationship between "timerLength" and "timeLeft" more
  const [timeLeft, setTimeLeft] = useState(timerLength);

  const [currentTestWPM, setCurrentTestWPM] = useState(0); // changed from "WPM" to "currentTestWPM"

  const [shouldUpdateCursor, setShouldUpdateCursor] = useState(false);

  const [hideSettings, setHideSettings] = useState();
  const [settings, setSettings] = useState({});

  const [showLogin, setShowLogin] = useState(false);

  //makes the cursor blink if the test is not started and textarea is selected
  useEffect(() => {
    console.log(isTimerActive);
    if (shouldUpdateCursor && !isTimerActive) {
      document.getElementById("cursor").classList.add("cursorBlink");
    } else document.getElementById("cursor").classList.remove("cursorBlink");
  }, [shouldUpdateCursor, isTimerActive]);

  useEffect(() => {
    console.log(settings);
  }, [settings]);

  useEffect(() => {
    if (settings.type == "time") {
      setTimerLength(settings.length);
    }
  }, [settings.type, settings.length]);

  useEffect(() => {
    setCurrentTestWPM((600 * numOfCorrectWords) / (timerLength - timeLeft)); // i'm just not going to touch this
  }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  return (
    <>
      <Header />
      <Cursor shouldUpdate={shouldUpdateCursor} />
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
            time={timerLength}
            isActive={isTimerActive}
            onTimerZero={() => {
              setIsTimerZero(!isTimerZero);
            }}
            passTimeLeft={setTimeLeft}
          />
        </div>

        <div
          style={{ display: "flex", alignSelf: "center", marginTop: "3rem" }}
        >
          {isTextFinished ? (
            <>
              {" LETTERS " + numOfCorrectLetters}
              {" WORDS " + numOfCorrectWords}
              {currentTestWPM < Infinity ? (
                <>{"WPM: " + currentTestWPM}</>
              ) : (
                <>{"WPM: 0"}</>
              )}
            </>
          ) : (
            <>FINISHED NO</>
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

          <Login loginVisible={showLogin} />
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
