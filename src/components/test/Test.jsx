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

    const [hideSettings, setHideSettings] = useState();
    const [renderTextArea, setRenderTextArea] = useState(true);

    const [settings, setSettings] = useState({});
    const [timer, setTimer] = useState({});
    const [game, setGame] = useState({ // sets default of game object to this state
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
        setGame(prevGame => ({ // whenever one of the dependencies changes it sets the game object to these values ( whatever the variables are set to, nothing special i think )
            isRunning: isTimerActive,
            isFinished: prevGame.isFinished, // i'm not sure if this is the right way to do this but its the only way i could make it work
            WPM: 0, // should we be setting this to 0...?
            correctWords: numOfCorrectWords,
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
            settings: settings,
            timer: timer,
        }));
    }, [timer, currentTestWPM, isTimerActive, numOfCorrectWords, correctLetters, incorrectLetters, settings]);

    useEffect(() => { // every time the game object is updated 
        if (game.isRunning) {
            if (!game.timer.isActive && game.timer.timeLeft === 0) { // come back to this later, regarding the game.timer.isActive part. 
                setIsTimerActive(false); // see what this part does because I have no clue since i thought it was getting assigned before
                setGame(prevGame => ({ // keeps the same settings as before but changes isFinished and isRunning
                   ...prevGame,
                    isFinished: true,
                    isRunning: false,
                }));
            }
        }
    }, [game]); 

    useEffect(() => {
        if (isTextFinished || timeLeft === 0) { // checks every time isTextFinished and game.timer.TimeLeft is changed
            setGame(prevGame => ({
               ...prevGame,
                isFinished: true,
            }));
        }
    }, [isTextFinished, game.timer.timeLeft]); // why does it used isTextFinished look at that 

    useEffect(() => { // figure out what this does later
        if (!renderTextArea) {
            setRenderTextArea(true);
        }
    }, [renderTextArea]);

    const startTest = () => { }; // why is this unused? 

    const resetTest = () => { // ok this makes sense I guess. need to find out when this function is called
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
            isFinished: false, // shouldn't this be set to true... or am i dumb
            WPM: 0,
            correctWords: numOfCorrectWords,
            correctLetters: correctLetters,
            incorrectLetters: incorrectLetters,
            settings: settings,
        }));
    };

    useEffect(() => { // for the wpm timer
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