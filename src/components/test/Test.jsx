import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import EndTest from "../endtest/EndTest";

const Test = () => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isTextFinished, setIsTextFinished] = useState(false);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [numOfCorrectWords, setNumOfCorrectWords] = useState(0);
    const [timerLength, setTimerLength] = useState(300);
    const [timeLeft, setTimeLeft] = useState(timerLength);
    const [currentTestWPM, setCurrentTestWPM] = useState(0);
    const [hideSettings, setHideSettings] = useState();
    const [renderTextArea, setRenderTextArea] = useState(true);
    const [settings, setSettings] = useState({});
    const [timer, setTimer] = useState({});
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

    useEffect(() => {
        setGame(prevGame => ({
            isRunning: isTimerActive,
            isFinished: prevGame.isFinished, // Keep the old value of isFinished
            WPM: 0,
            correctWords: numOfCorrectWords,
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
            settings: settings,
            timer: timer,
        }));
    }, [timer, currentTestWPM, isTimerActive, numOfCorrectWords, correctLetters, incorrectLetters, settings]);

    useEffect(() => {
        setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft));
    }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

    useEffect(() => {
        if (game.isRunning) {
            if (!game.timer.isActive && game.timer.timeLeft === 0) {
                setIsTimerActive(false);
                setGame(prevGame => ({
                   ...prevGame,
                    isFinished: true,
                    isRunning: false,
                }));
            }
        }
    }, [game]);

    useEffect(() => {
        if (isTextFinished || timeLeft === 0) {
            setGame(prevGame => ({
               ...prevGame,
                isFinished: true,
            }));
        }
    }, [isTextFinished, game.timer.timeLeft]);

    useEffect(() => {
        if (!renderTextArea) {
            setRenderTextArea(true);
        }
    }, [renderTextArea]);

    const startTest = () => { };

    const resetTest = () => {
        setIsTimerActive(false);
        setIsTextFinished(false);
        setCurrentTestWPM(0);
        setCorrectLetters([]);
        setIncorrectLetters([]);
        setNumOfCorrectWords(0);
        setGame(prevGame => ({
           ...prevGame,
            isRunning: false,
            isFinished: false,
            WPM: 0,
            correctWords: 0,
            correctLetters: [],
            incorrectLetters: [],
            settings: settings,
        }));
    };

    const stopTest = () => {
        setIsTimerActive(false);
        setGame(prevGame => ({
           ...prevGame,
            isRunning: false,
            isFinished: false,
            WPM: 0,
            correctWords: numOfCorrectWords,
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
            settings: settings,
        }));
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
            </div>
            <div
                style={{
                    display: "flex",
                    alignSelf: "center",
                    justifyContent: "center",
                    transition: "all.15s ease-out",
                }}
            >
                {renderTextArea? (
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

export default Test;22