import "./App.css";
import Word from "./components/word/Word";
import Timer from "./components/timer/Timer";
import TextArea from "./components/textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "./components/cursor/Cursor";
import Settings from "./components/settings/Settings";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import EndTest from "./components/endtest/EndTest";

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

  //settings object
  const [settings, setSettings] = useState({});

  //timer object
  const [timer, setTimer] = useState({});

  //game object
  const [game, setGame] = useState({
    isRunning: false,
    isFinished: false,
    WPM: 0,
    correctWords: 0,
    correctLetters: 0,
    settings: {},
    timer: {
      timeLeft: timerLength,
      isActive: isTimerActive,
      timerGoesUp: false,
    },
  });

  //game state updating

  useEffect(() => {
    console.log(game);
  }, [game]);

  useEffect(() => {
    setGame({
      isRunning: isTimerActive,
      isFinished: false,
      WPM: 0,
      correctWords: numOfCorrectWords,
      correctLetters: numOfCorrectLetters,
      settings: settings,
      timer: timer
    });
  }, [timer, currentTestWPM, isTimerActive, numOfCorrectWords, settings]);

  //makes the cursor blink if the test is not started and textarea is selected
  useEffect(() => {
    // console.log(isTimerActive);
    if (shouldUpdateCursor && !isTimerActive) {
      document.getElementById("cursor").classList.add("cursorBlink");
    } else document.getElementById("cursor").classList.remove("cursorBlink");
  }, [shouldUpdateCursor, isTimerActive]);

  useEffect(() => {
    // console.log(timerLength - timeLeft)
    setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft)); // i'm just not going to touch this
  }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  //timer reset if settings changed
  // useEffect(() => {
  //   if (isTimerActive && !settings.visible) {
  //     console.log('timer active cause settings not visible')
  //   }
  //   if (isTimerActive && settings.visible) {
  //     setIsTimerActive(false)
  //     setGame({
  //       ...game,
  //       timer: {
  //         ...game.timer,
  //         timeLeft: settings.timeLeft
  //       }
  //     })
  //     console.log('should have done something ')

  //   }
  // }, [isTimerActive, settings])

  // useEffect(() => {
  //   if (settings.visible) {
  //     setIsTimerActive(false)
  //     setIsTextFinished(false)
  //     setNumOfCorrectLetters(0)
  //     setNumOfCorrectWords(0)

  // setGame({
  //   isRunning: false,
  //   isFinished: false,
  //   WPM: 0,
  //   correctWords: numOfCorrectWords,
  //   correctLetters: numOfCorrectLetters,
  //   settings: settings,
  //   timer: timer,
  // })
  //   }
  // }, [settings.visible, settings])

  useEffect(() => {
    if (game.isRunning) {
      // console.log(game.isRunning)

      if (!game.timer.isActive && game.timer.timeLeft == 0) {
        setIsTimerActive(false);
        console.log("times up");
        setGame({
          ...game,
          isFinished: true,
          isRunning: false,
        });
      }

      //figure out what test it is, use timer down vs timer up
    }
    if (game.isFinished) {
      // console.log(currentTestWPM)
      setGame({
        ...game,
        WPM:
          ((game.correctWords * 60) /
            (game.settings.length - game.timer.timeLeft)) *
          10,
      });
    }
  }, [game.isRunning, game.isFinished, game.timer.isActive]);

  useEffect(() => {
    if (isTextFinished || timeLeft == 0) {
      setGame({
        ...game,
        isFinished: true,
      });
    }
  }, [isTextFinished, timeLeft]);

  //game logic

  const startTest = () => { };
  const resetTest = () => {
    setIsTimerActive(false);
    setIsTextFinished(false);
    setCurrentTestWPM(0);
    setNumOfCorrectLetters(0);
    setNumOfCorrectWords(0);

    setGame({
      ...game,
      isRunning: false,
      isFinished: false,
      WPM: 0,
      correctWords: numOfCorrectWords,
      correctLetters: numOfCorrectLetters,
      settings: settings,
      // timer: {
      //   timeLeft: settings.length,
      //   isActive: false,
      //   timerGoesUp: false,
      // },
    });
  };

  const stopTest = () => {
    setIsTimerActive(false);
    setGame({
      ...game,
      isRunning: false,
      isFinished: false,
      WPM: 0,
      correctWords: numOfCorrectWords,
      correctLetters: numOfCorrectLetters,
      settings: settings,
      // timer: {
      //   timeLeft: settings.length,
      //   isActive: false,
      //   timerGoesUp: false,
      // },
    });
  };

  return (
    <>
      <Header />
      <Login />
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
            settings={settings}
            game={game}
            updateTimerInfo={setTimer}
            start={isTimerActive}
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

          <TextArea
            settings={settings}
            game={game}
            passCorrectLetters={setNumOfCorrectLetters}
            passCorrectWords={setNumOfCorrectWords}
            onTextStarted={() => {
              setIsTimerActive(true);
              setIsTextFinished(false);
              setShouldUpdateCursor(true);
            }}
            onTextFinished={() => {
              setIsTextFinished(true);
              setShouldUpdateCursor(false);
            }}
            onFocus={() => {
              setShouldUpdateCursor(true);
              setHideSettings(true);
            }}
            onFocusLost={() => {
              console.log("focus lost");
              stopTest();

              setHideSettings(false);
              setShouldUpdateCursor(false);
            }}
          />
        </div>
        <EndTest />
      </div>
    </>
  );
}

export default App;
