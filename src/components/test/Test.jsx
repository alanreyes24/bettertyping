import Word from "../word/Word";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";

import { React, useState, useEffect } from "react";
import Cursor from "../cursor/Cursor";
import Settings from "../settings/Settings";
import Header from "../header/Header";
import Login from "../login/Login";
import EndTest from "../endtest/EndTest";

function Test() {
    const [isTimerActive, setIsTimerActive] = useState(false);

    const [isTimerZero, setIsTimerZero] = useState(false); // changed "isTimerZero" to be "isTimerZero"
    const [isTextFinished, setIsTextFinished] = useState(false); // this was named correctly good job

    const [correctLetters, setCorrectLetters] = useState([]); // changed from "correctLetters" to "correctLetters"
    const [incorrectLetters, setIncorrectLetters] = useState([]);

    const [numOfCorrectWords, setNumOfCorrectWords] = useState(0); // changed from "correctWords" to "numOfCorrectWords"

    const [timerLength, setTimerLength] = useState(300); // going to need you to explain the relationship between "timerLength" and "timeLeft" more
    const [timeLeft, setTimeLeft] = useState(timerLength);

    const [currentTestWPM, setCurrentTestWPM] = useState(0); // changed from "WPM" to "currentTestWPM"

    const [hideSettings, setHideSettings] = useState();

    const [renderTextArea, setRenderTextArea] = useState(true);

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
        correctLetters: [],
        incorrectLetters: [],
        settings: {},
        timer: {
            timeLeft: timerLength,
            isActive: isTimerActive,
            timerGoesUp: false,
        },
    });

    //game state updating

    useEffect(() => {
        // console.log(game);
        console.log("correctLetters:")
        console.log(correctLetters)
        // console.log("incorrectLetters:")
        // console.log(incorrectLetters)
    }, [game]);

    useEffect(() => {
        setGame({
            isRunning: isTimerActive,
            isFinished: false,
            WPM: 0,
            correctWords: numOfCorrectWords,
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
            settings: settings,
            timer: timer,
        });
    }, [
        timer,
        currentTestWPM,
        isTimerActive,
        numOfCorrectWords,
        correctLetters,
        incorrectLetters,
        settings,
    ]);

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
    //     setCorrectLetters(0)
    //     setNumOfCorrectWords(0)

    // setGame({
    //   isRunning: false,
    //   isFinished: false,
    //   WPM: 0,
    //   correctWords: numOfCorrectWords,
    //   correctLetters: correctLetters,
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

    //any time text is told to stop rendering, instantly rerender it, good for now may need to change later
    useEffect(() => {
        if (!renderTextArea) {
            setRenderTextArea(true);
        }
    }, [renderTextArea]);

    //game logic

    const startTest = () => { };

    const resetTest = () => {
        setIsTimerActive(false);
        setIsTextFinished(false);
        setCurrentTestWPM(0);
        setCorrectLetters(0);
        setNumOfCorrectWords(0);
        setIsTimerActive(false);
        setCorrectLetters([]);
        setIncorrectLetters([]);
        setGame({
            ...game,
            isRunning: false,
            isFinished: false,
            WPM: 0,
            correctWords: numOfCorrectWords,
            correctLetters: [],
            incorrectLetters: [],
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
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
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

                {isTextFinished ? <>FINISHED YES</> : <>FINISHED NO</>}
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
                <>
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
                                    setRenderTextArea(false);
                                    resetTest();
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
                                }}
                            ></div>
                        </>
                    )}
                </>
            </div>
            <EndTest
                correctLetters={correctLetters}
                incorrectLetters={incorrectLetters}
            />
        </>
    );
}

export default Test;
