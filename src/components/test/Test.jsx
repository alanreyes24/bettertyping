import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import EndTest from "../endtest/EndTest";

const Test = () => {
  const [hideSettings, setHideSettings] = useState(false);

  // sets default of test object to this state
  const [test, setTest] = useState({
    //eventually have unique IDs for tests for links/db
    testID: 0,
    // -1 loading, 0 unstarted, 1 running, 2 paused, 3 finished
    state: -1,
    finished: false,
    //words object
    words: {
      WPM: 0,
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
  });

  let settings = {
    type: "time",
    length: 300,
    count: 50,
    visible: false,
  };

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
  }

  // FINISH TEST
  if (test.state == 3 && test.finished == false) {
    setTest((t) => ({ ...t, finished: true }));
    console.log("TEST FINISH");
  }

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
