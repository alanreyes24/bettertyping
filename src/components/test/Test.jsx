import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import EndTest from "../endtest/EndTest";

const Test = () => {
  const [hideSettings, setHideSettings] = useState();

  // sets default of test object to this state
  const [test, setTest] = useState({
    //eventually have unique IDs for tests for links/db
    testID: 0,
    // 0 unstarted, 1 running, 2 paused, 3 finished
    state: 0,
    //words object
    words: {
      WPM: 0,
      attemptedWords: 0,
      letters: {
        correctLetters: [],
        incorrectLetters: [],
      },
    },
    //settings object
    settings: {
      type: "time",
      length: 300,
      count: 50,
      visible: false,
    },
    //timer object
    timer: {
      timeLeft: 300,
      isActive: false,
      timerGoesUp: false,
    },
  });

  const [settings, setSettings] = useState({
    type: "time",
    length: 300,
    count: 50,
    visible: false,
  });

  useEffect(() => {
    //HANDLE SETTINGS and defaults
    if (test.settings != settings) {
      setTest((prevTest) => ({
        ...prevTest,
        timer: {
          ...prevTest.timer,
          timeLeft: settings.length,
        },
        settings: settings,
      }));
    }

    //HANDLE TIMER
    // TODO: PAUSE FUNCTIONALITY
    if (test.state == 1) {
      if (test.settings.type == "time" && test.timer.timeLeft > 0) {
        setTimeout(() => {
          setTest((prevTest) => {
            {
              return {
                ...prevTest,
                timer: {
                  ...prevTest.timer,
                  timeLeft: prevTest.timer.timeLeft - 1,
                },
              };
            }
          });
        }, 100);
      } else if (test.settings.type == "words") {
        setTimeout(() => {
          setTest((prevTest) => {
            {
              return {
                ...prevTest,
                timer: {
                  ...prevTest.timer,
                  timeLeft: prevTest.timer.timeLeft + 1,
                },
              };
            }
          });
        }, 100);
      }
    }

    // HANDLE END OF TEST
    if (
      test.state <= 1 &&
      test.timer.timeLeft == 0 &&
      test.settings.type == "time"
    ) {
      setTest((prevTest) => ({
        ...prevTest,
        state: 3,
      }));
    } else if (test.state <= 1 && test.settings.type == "words") {
      setTest((prevTest) => ({
        ...prevTest,
        state: 3,
      }));
    }
  }, [
    test.state,
    test.timer.timeLeft,
    test.settings.type,
    test.settings,
    settings,
  ]);

  console.log(test);

  //////// GAME OBJECT STATE UPDATER
  //   useEffect(() => {
  //     setGame((prevGame) => ({
  //       // whenever one of the dependencies changes it sets the game object to these values ( whatever the variables are set to, nothing special i think )
  //       isRunning: isTimerActive,
  //       isFinished: isGameFinished, // i'm not sure if this is the right way to do this but its the only way i could make it work
  //       WPM: 0, // should we be setting this to 0...?
  //       correctWords: numOfCorrectWords,
  //       correctLetters: correctLetters,
  //       incorrectLetters: incorrectLetters,
  //       settings: settings,
  //       timer: timer,
  //     }));
  //   }, [
  //     timer,
  //     currentTestWPM,
  //     isTimerActive,
  //     numOfCorrectWords,
  //     correctLetters,
  //     incorrectLetters,
  //     settings,
  //     isGameFinished,
  //   ]);

  //////// GAME LOGIC HANDLING
  //   useEffect(() => {
  //     // every time the game object is updated
  //     if (game.isRunning) {
  //       if (!game.timer.isActive && game.timer.timeLeft == 0) {
  //         setIsGameFinished(true);

  //         setGame((prevGame) => ({
  //           ...prevGame,
  //           isFinished: isGameFinished,
  //           isRunning: isTimerActive,
  //         }));
  //       }
  //     }
  //   }, [game]);

  //   useEffect(() => {
  //     if (isTextFinished || timeLeft == 0) {
  //       // checks every time isTextFinished and game.timer.TimeLeft is changed
  //       //   stopTest();
  //       setGame((prevGame) => ({
  //         ...prevGame,
  //         isFinished: true,
  //       }));
  //     }
  //   }, [isTextFinished, game.timer.timeLeft]);

  //   useEffect(() => {
  //     if (!renderTextArea) {
  //       setRenderTextArea(true);
  //     }
  //   }, [renderTextArea]);

  // COMMENT OUT FOR NOW, COMMENT IN WHEN NEEDED FOR TESTING, TODO: CLEAN UP ALL OF THIS
  //   const startTest = () => {}; // why is this unused?

  //   const resetTest = () => {
  //     setIsTimerActive(false);
  //     setIsTextFinished(false);
  //     setCurrentTestWPM(0);
  //     setCorrectLetters([]);
  //     setIncorrectLetters([]);
  //     setNumOfCorrectWords(0);
  //     setGame((prevGame) => ({
  //       ...prevGame,
  //       isRunning: false,
  //       isFinished: false,
  //       WPM: 0,
  //       correctWords: 0,
  //       correctLetters: [],
  //       incorrectLetters: [],
  //       settings: settings,
  //     }));
  //   };

  //   const stopTest = () => {
  //     setIsTimerActive(false);
  //     setGame((prevGame) => ({
  //       ...prevGame,
  //       isRunning: false,
  //       isFinished: true,
  //       WPM: 0,
  //       correctWords: numOfCorrectWords,
  //       correctLetters: correctLetters,
  //       incorrectLetters: incorrectLetters,
  //       settings: settings,
  //     }));
  //     console.log(game);
  //   };

  //   useEffect(() => {
  //     // for the wpm timer
  //     setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft));
  //   }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  return (
    <>
      <div style={{ display: "flex", alignSelf: "center", marginTop: "5rem" }}>
        <Settings hideModal={hideSettings} passSettings={setSettings} />
      </div>
      <div style={{ justifyContent: "center", alignSelf: "center" }}>
        <Timer test={test} />
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          transition: "all.15s ease-out",
        }}>
        <TextArea
          test={test}
          settings={settings}
          //   passCorrectLetters={setCorrectLetters}
          //   passIncorrectLetters={setIncorrectLetters}
          //   passCorrectWords={setNumOfCorrectWords}
          onTextStarted={() => {
            setTest((prevTest) => ({
              ...prevTest,
              state: 1,
            }));
          }}
          onTextFinished={() => {
            setTest((prevTest) => ({
              ...prevTest,
              state: 3,
            }));
          }}
          onFocus={() => {}}
          onFocusLost={() => {}}
        />
      </div>
      <EndTest
        // correctLetters={correctLetters}
        // incorrectLetters={incorrectLetters}
        test={test}
      />
    </>
  );
};

export default Test;
22;
