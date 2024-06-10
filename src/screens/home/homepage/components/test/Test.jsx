import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import EndTest from "../endtest/EndTest";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../../AuthContext";

const Test = ({ user }) => {

  const sendTestToBackend = async () => {
    // e.preventDefault(); // not sure if i need this here uhhh
      try {
        const response = await axios.post("http://localhost:3090/test", test); // not sure if i need curly brackets

        console.log(response);

        // TODO: AFTER TEST SENT, NAVIGATE TO RESULT SCREEN

        // window.location.href = `${
        //   window.location.href + `test/${response.data._id}`
        // }`;
      } catch (error) {
        console.log(error);
        console.error("Error registering:", error.response.data);
      }
    
  };

  const [hideSettings, setHideSettings] = useState(false);

  // sets default of test object to this state
  const [test, setTest] = useState({
    //eventually have unique IDs for tests for links/db
    userID: "", // gets set to the User's ID later on
    username: "aaaa",
    testID: 0,
    // -1 loading, 0 unstarted, 1 running, 2 paused, 3 finished
    state: -1,
    finished: false,
    //words object
    words: {
      wordList: [],
      attemptedWords: 0,
      //may possibly make this object?
      //   letters: {
      correctLetters: [],
      incorrectLetters: [],
      //   },
    },
    //settings object
    settings: {
      type: "time",
      length: 300,
      count: 50,
      //   visible: false,
    },
    //timer object
    timer: {
      timeLeft: 300,
      isActive: false,
      timerGoesUp: false,
    },
    results: {
      //   correctOnlyWPM: 0,
      //   rawWPM: 0,
      //   trueWPM: 0,
      //   accuracy: 0,
    },
    eventLog: [
      //eventlog :)
    ],
    timestamp: 0,
  });

  // END OF TEST
  if (
    test.state <= 1 &&
    test.timer.timeLeft == 0 &&
    test.settings.type == "time"
  ) {
    setTest((prevTest) => ({
      ...prevTest,
      state: 3,
    }));
  }

  // FINISH TEST
  if (test.state == 3 && !test.finished) {
    setTest((t) => ({ ...t, finished: true }));
  }

  // RESULTS
  // if test is over and results are empty, put results
  if (test.finished && Object.keys(test.results).length === 0) {
    //this will only work on time tests
    let totalCorrect = 0;
    let totalIncorrect = 0;

    for (const [key, value] of Object.entries(test.words.correctLetters)) {
      totalCorrect += value.length;
    }

    for (const [key, value] of Object.entries(test.words.incorrectLetters)) {
      totalIncorrect += value.length;
    }

    let correctOnlyWPM =
      (600 * (totalCorrect / 5)) / (test.settings.length - test.timer.timeLeft);

    let trueWPM =
      (600 * ((totalCorrect - totalIncorrect) / 5)) /
      (test.settings.length - test.timer.timeLeft);

    let rawWPM =
      (600 * ((totalCorrect + totalIncorrect) / 5)) /
      (test.settings.length - test.timer.timeLeft);

    if (test.settings.type == "words") {
      rawWPM *= -1;
      trueWPM *= -1;
      correctOnlyWPM *= -1;
    }

    // console.log("correct only WPM: " + correctOnlyWPM);
    // console.log("true WPM: " + trueWPM);
    // console.log("raw WPM: " + rawWPM);

    let accuracy = ((totalCorrect / (totalCorrect + totalIncorrect)) * 100).toFixed(2);
    setTest((prevTest) => ({
      ...prevTest,
      results: {
        ...prevTest.results,
        trueWPM: trueWPM,
        correctOnlyWPM: correctOnlyWPM,
        rawWPM: rawWPM,
        accuracy: accuracy,
      },
    }));
  }


  useEffect(() => {
    if (test.state == 1) {
      let username = localStorage.getItem('username');
      console.log(username);
  
      if (test.userID == "") {
        setTest((prevTest) => ({
         ...prevTest,
          username: username,
          userID: user._id,
        }));
      }
    }
  }, [test.state]);

  useEffect(() => {
    //HANDLE TIMER
    // TODO: PAUSE FUNCTIONALITY
    if (test.state == 1) {

      setHideSettings(true);

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
                  timerGoesUp: true,
                },
              };
            }
          });
        }, 100);
      }
    }
  }, [test.settings.type, test.timer.timeLeft, test.state]);

  //   console.log(test);

  //   useEffect(() => {
  //     // for the wpm timer
  //     setCurrentTestWPM((60 * numOfCorrectWords) / (timerLength - timeLeft));
  //   }, [currentTestWPM, numOfCorrectWords, timerLength, timeLeft]);

  useEffect(() => {
    if (test.state == 3 && test.finished && test.eventLog.length != 0) {

      sendTestToBackend(); // not sure if this is gonna work right but
      console.log(test);
    }
  }, [test.eventLog]);

  return (
    <>
      <div style={{ display: "flex", alignSelf: "center", marginTop: "5rem" }}>
        {hideSettings ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
              padding: "1rem",
              width: "20rem",
              minHeight: "1rem",
              maxHeight: "1rem",
            }}></div>
        ) : (
          <>
            <Settings
              hideModal={hideSettings}
              test={test}
              passSettings={(newSettings) => {
                if (
                  JSON.stringify(newSettings) != JSON.stringify(test.settings)
                ) {
                  setTest((prevTest) => ({
                    ...prevTest,
                    timer: {
                      ...prevTest.timer,
                      timeLeft: newSettings.length,
                    },
                    settings: newSettings,
                  }));
                }
              }}
            />
          </>
        )}
      </div>
      <>
        <div style={{ justifyContent: "center", alignSelf: "center" }}>
          <button onClick={sendTestToBackend}>sendTestToBackend</button>
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
            //   settings={settings}
            passWords={(w) => {
              setTest((prevTest) => ({
                ...prevTest,
                words: {
                  ...prevTest.words,
                  attemptedWords: 1,
                  wordList: w,
                },
              }));
            }}
            passCorrectLetters={(l) => {
              setTest((prevTest) => ({
                ...prevTest,
                words: {
                  ...prevTest.words,
                  correctLetters: l,
                },
              }));
            }}
            passIncorrectLetters={(l) => {
              setTest((prevTest) => ({
                ...prevTest,
                words: {
                  ...prevTest.words,
                  incorrectLetters: l,
                },
              }));
            }}
            // passCorrectWords={setNumOfCorrectWords}
            onTextLoaded={() => {
              setTest((prevTest) => ({
                ...prevTest,
                state: 0,
              }));
            }}
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
            passEventLog={(e) => {
              setTest((prevTest) => ({
                ...prevTest,
                timestamp: e[0].timestamp,
                eventLog: e,
              }));
            }}
            onFocus={() => {}}
            onFocusLost={() => {}}
          />
        </div>
      </>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Align children vertically
          alignItems: "center", // Center horizontally
          justifyContent: "center", // Center vertically
        }}>
        <EndTest user={user} test={test} />
      </div>
    </>
  );
};

export default Test;
