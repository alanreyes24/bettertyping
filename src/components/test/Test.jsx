import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import EndTest from "../endtest/EndTest";

const Test = () => {
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // we haven't really implemented this functionality fully yet
  const [currentTestWPM, setCurrentTestWPM] = useState(0); // we haven't really implemented this functionality fully yet as well

  const [timerLength, setTimerLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(timerLength);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTextFinished, setIsTextFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [hideSettings, setHideSettings] = useState();
  const [renderTextArea, setRenderTextArea] = useState(true);

  const [settings, setSettings] = useState({});
  const [timer, setTimer] = useState({});
  const [game, setGame] = useState({
    // sets default of game object to this state
    isRunning: false,
    isFinished: false,
    WPM: 0,
    correctWords: 0,
    correctLetters: [],
    incorrectLetters: [],
    settings: {},
    timer: {
      timeLeft: timerLength,
      isActive: isTimerActive,
      timerGoesUp: false,
    },
  });

  //////// GAME OBJECT STATE UPDATER
  useEffect(() => {
    setGame((prevGame) => ({
      // whenever one of the dependencies changes it sets the game object to these values ( whatever the variables are set to, nothing special i think )
      isRunning: isTimerActive,
      isFinished: isGameFinished, // i'm not sure if this is the right way to do this but its the only way i could make it work
      WPM: 0, // should we be setting this to 0...?
      correctWords: numOfCorrectWords,
      correctLetters: correctLetters,
      incorrectLetters: incorrectLetters,
      settings: settings,
      timer: timer,
    }));
  }, [
    timer,
    currentTestWPM,
    isTimerActive,
    numOfCorrectWords,
    correctLetters,
    incorrectLetters,
    settings,
    isGameFinished,
  ]);

  //////// GAME LOGIC HANDLING
  useEffect(() => {
    // every time the game object is updated
    if (game.isRunning) {
      if (!game.timer.isActive && game.timer.timeLeft == 0) {
        // stopTest();
        setIsTimerActive(false);
        setIsGameFinished(true);

        setGame((prevGame) => ({
          ...prevGame,
          isFinished: isGameFinished,
          isRunning: isTimerActive,
        }));
      }
    }
  }, [game]);

  useEffect(() => {
    console.log(game);
  }, [game]);

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

  useEffect(() => {
    if (!renderTextArea) {
      setRenderTextArea(true);
    }
  }, [renderTextArea]);

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

  useEffect(() => {
    // for the wpm timer
    setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft));
  }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  return (
    <>
      <div style={{ display: "flex", alignSelf: "center", marginTop: "5rem" }}>
        <Settings hideModal={hideSettings} passSettings={setSettings} />
      </div>
      <div style={{ justifyContent: "center", alignSelf: "center" }}>
        <Timer
          settings={settings}
          game={game}
          updateTimerInfo={setTimer}
          start={isTimerActive}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          transition: "all.15s ease-out",
        }}>
        {renderTextArea ? (
          <>
            <TextArea
              settings={settings}
              game={game}
              passCorrectLetters={setCorrectLetters}
              passIncorrectLetters={setIncorrectLetters}
              passCorrectWords={setNumOfCorrectWords}
              onTextStarted={() => {
                setIsTimerActive(true);
                setIsTextFinished(false);
              }}
              onTextFinished={() => {
                setIsTextFinished(true);
              }}
              onFocus={() => {
                setHideSettings(true);
              }}
              onFocusLost={() => {
                // resetTest();
                setHideSettings(false);
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                opacity: 0,
                overflow: "hidden",
                minWidth: "65vw",
                maxWidth: "80vw",
                height: "6rem",
              }}></div>
          </>
        )}
      </div>
      <EndTest
        correctLetters={correctLetters}
        incorrectLetters={incorrectLetters}
        game={game}
      />
    </>
  );
};

export default Test;
22;
