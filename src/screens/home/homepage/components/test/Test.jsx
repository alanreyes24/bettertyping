import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../AuthContext";

const Test = ({ user, AIMode }) => {
  const navigate = useNavigate();

  const [selectedDifficulty, setSelectedDifficulty] = useState("normal");

  const handleEndTestRedirect = () => {
    navigate("/test-finished", { state: { AIMode } }); // add AIMode passing here
  };

  const sendTestToBackend = async () => {
    try {
      await axios.post("http://localhost:3090/test", test, {
        withCredentials: true,
      });

      // Uncomment and adjust the following lines if you need to manipulate the URL directly
      // window.location.href = ${window.location.href}/test/${response.data._id};
    } catch (error) {
      console.log(error);
      console.error("Error submitting test:", error.response?.data);
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
      correctLetters: [],
      incorrectLetters: [],
      trueWPMArray: [],
      rawWPMArray: [],
    },
    //settings object
    settings: {
      type: "time",
      length: 4040,
      count: 50,
      difficulty: "normal",
    },
    //timer object
    timer: {
      timeLeft: 300,
      isActive: false,
      timerGoesUp: false,
    },
    results: {},
    eventLog: [],
    timestamp: 0,
  });

  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);

  // END OF TEST
  useEffect(() => {
    if (
      test.state <= 1 &&
      test.timer.timeLeft === 0 &&
      test.settings.type === "time"
    ) {
      setTest((prevTest) => ({
        ...prevTest,
        state: 3,
      }));
    }
  }, [test]);

  // FINISH TEST
  useEffect(() => {
    if (test.state === 3 && !test.finished) {
      setTest((prevTest) => ({
        ...prevTest,
        finished: true,
      }));
    }
  }, [test]);

  // RESULTS
  useEffect(() => {
    if (test.finished && Object.keys(test.results).length === 0) {
      let totalCorrect = 0;
      let totalIncorrect = 0;

      for (const value of Object.values(test.words.correctLetters)) {
        totalCorrect += value.length;
      }

      for (const value of Object.values(test.words.incorrectLetters)) {
        totalIncorrect += value.length;
      }

      let correctOnlyWPM =
        (600 * (totalCorrect / 5)) /
        (test.settings.length - test.timer.timeLeft);

      let trueWPM =
        (600 * ((totalCorrect - totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);

      let rawWPM =
        (600 * ((totalCorrect + totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);

      if (test.settings.type === "words") {
        rawWPM *= -1;
        trueWPM *= -1;
        correctOnlyWPM *= -1;
      }

      let accuracy = (
        (totalCorrect / (totalCorrect + totalIncorrect)) *
        100
      ).toFixed(2);
      setTest((prevTest) => ({
        ...prevTest,
        results: {
          trueWPM: trueWPM,
          correctOnlyWPM: correctOnlyWPM,
          rawWPM: rawWPM,
          accuracy: accuracy,
        },
      }));
    }
  }, [test]);

  useEffect(() => {
    if (test.state === 1) {
      if (test.userID === "") {
        setTest((prevTest) => ({
          ...prevTest,
          userID: user._id,
          username: user.username,
          settings: {
            ...prevTest.settings,
            difficulty: selectedDifficulty,
          },
        }));
      }
    }
  }, [test.state]);

  useEffect(() => {
    //HANDLE TIMER
    if (test.state === 1) {
      setHideSettings(true);

      if (test.settings.type === "time" && test.timer.timeLeft > 0) {
        setTimeout(() => {
          setTest((prevTest) => ({
            ...prevTest,
            timer: {
              ...prevTest.timer,
              timeLeft: prevTest.timer.timeLeft - 1,
            },
          }));
        }, 100);
      } else if (test.settings.type === "words") {
        setTimeout(() => {
          setTest((prevTest) => ({
            ...prevTest,
            timer: {
              ...prevTest.timer,
              timeLeft: prevTest.timer.timeLeft + 1,
              timerGoesUp: true,
            },
          }));
        }, 100);
      }
    }
  }, [test.settings.type, test.timer.timeLeft, test.state]);

  useEffect(() => {
    if (test.state === 1 && !test.finished) {
      setTimeout(() => {
        setTrueWPMArray((prevArray) => [
          ...prevArray,
          calculateWPMs("trueWPM"),
        ]);
        setRawWPMArray((prevArray) => [...prevArray, calculateWPMs("rawWPM")]);
      }, 1000);
    }
  }, [test.state, trueWPMArray]);

  useEffect(() => {
    if (test.finished) {
      const convertedTrueWPMArray = trueWPMArray.map((item, index) => ({
        x: index,
        y: parseFloat(item),
      }));
      const convertedRawWPMArray = rawWPMArray.map((item, index) => ({
        x: index,
        y: parseFloat(item),
      }));

      setTrueWPMArray(convertedTrueWPMArray);
      setRawWPMArray(convertedRawWPMArray);

      setTest((prevTest) => ({
        ...prevTest,
        words: {
          ...prevTest.words,
          trueWPMArray: convertedTrueWPMArray,
          rawWPMArray: convertedRawWPMArray,
        },
      }));
    }
  }, [test.finished]);

  useEffect(() => {
    if (
      test.state === 3 &&
      test.finished &&
      test.eventLog.length !== 0 &&
      user.username !== "guest" &&
      !AIMode
    ) {
      sendTestToBackend(); // not sure if this is gonna work right but
      handleEndTestRedirect();
    } else if (
      test.state === 3 &&
      test.finished &&
      test.eventLog.length !== 0 &&
      user.username !== "guest" &&
      AIMode
    ) {
      handleEndTestRedirect();
    }
  }, [test.eventLog]);

  const calculateWPMs = (type) => {
    if (test.state === 1) {
      let totalCorrect = 0;
      let totalIncorrect = 0;

      for (const value of Object.values(test.words.correctLetters)) {
        totalCorrect += value.length;
      }

      for (const value of Object.values(test.words.incorrectLetters)) {
        totalIncorrect += value.length;
      }

      let trueWPM =
        (600 * ((totalCorrect - totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);
      let rawWPM =
        (600 * ((totalCorrect + totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);

      if (type === "trueWPM" && !isNaN(trueWPM)) {
        return test.settings.type === "time"
          ? trueWPM.toFixed(2)
          : (trueWPM * -1).toFixed(2);
      } else if (type === "rawWPM" && !isNaN(rawWPM)) {
        return test.settings.type === "time"
          ? rawWPM.toFixed(2)
          : (rawWPM * -1).toFixed(2);
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {!AIMode && (
        <div>
          <button onClick={() => setSelectedDifficulty("easy")}> easy </button>
          <button onClick={() => setSelectedDifficulty("normal")}>
            {" "}
            normal{" "}
          </button>
          <button onClick={() => setSelectedDifficulty("hard")}> hard </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignSelf: "center",
          marginTop: "5rem",
        }}
      >
        {hideSettings || AIMode ? (
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
            }}
          ></div>
        ) : (
          <>
            <Settings
              hideModal={hideSettings}
              test={test}
              passSettings={(newSettings) => {
                setTest((prevTest) => ({
                  ...prevTest,
                  timer: {
                    ...prevTest.timer,
                    timeLeft: newSettings.length,
                  },
                  settings: newSettings,
                }));
              }}
            />
          </>
        )}
      </div>
      <>
        <div style={{ justifyContent: "center", alignSelf: "center" }}>
          <Timer test={test} />
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            transition: "all .15s ease-out",
          }}
        >
          <TextArea
            user={user}
            aiMode={AIMode}
            test={test}
            selectedDifficulty={selectedDifficulty}
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
      {user.username === "guest" ? (
        <div style={{ display: "flex" }}>
          {" "}
          in order to save your test you need to log-in
        </div>
      ) : null}
    </div>
  );
};

export default Test;
