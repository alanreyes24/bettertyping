import React, { useState, useEffect } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Test = ({ user, AIMode }) => {
  const navigate = useNavigate();

  const handleEndTestRedirect = () => {
    navigate("/test-finished", { state: { AIMode } });
  };

  const sendTestToBackend = async () => {
    try {
      console.log("SENDING!");
      await axios.post(`${import.meta.env.VITE_API_URL}/test`, test, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error submitting test:", error.response?.data);
    }
  };

  const sendAITestToBackend = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ai/test`, test, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error submitting AI test:", error.response?.data);
    }
  };

  const [hideSettings, setHideSettings] = useState(false);

  const [test, setTest] = useState({
    userID: "",
    username: "aaaa",
    testID: 0,
    state: -1,
    finished: false,
    words: {
      wordList: [],
      attemptedWords: 0,
      correctLetters: [],
      incorrectLetters: [],
      trueWPMArray: [],
      rawWPMArray: [],
    },
    settings: {
      type: "time",
      length: 300,
      count: 50,
      difficulty: "normal",
    },
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

  useEffect(() => {
    if (test.state === 3 && !test.finished) {
      setTest((prevTest) => ({
        ...prevTest,
        finished: true,
      }));
    }
  }, [test]);

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

      const correctOnlyWPM =
        (600 * (totalCorrect / 5)) /
        (test.settings.length - test.timer.timeLeft);
      const trueWPM =
        (600 * ((totalCorrect - totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);
      const rawWPM =
        (600 * ((totalCorrect + totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);

      const accuracy = (
        (totalCorrect / (totalCorrect + totalIncorrect)) *
        100
      ).toFixed(2);

      setTest((prevTest) => ({
        ...prevTest,
        results: {
          trueWPM: test.settings.type === "time" ? trueWPM : trueWPM * -1,
          correctOnlyWPM:
            test.settings.type === "time"
              ? correctOnlyWPM
              : correctOnlyWPM * -1,
          rawWPM: test.settings.type === "time" ? rawWPM : rawWPM * -1,
          accuracy,
        },
      }));
    }
  }, [test]);

  useEffect(() => {
    if (test.state === 1 && test.userID === "") {
      setTest((prevTest) => ({
        ...prevTest,
        userID: user._id,
        username: user.username,
      }));
    }
  }, [test.state, user]);

  useEffect(() => {
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
    const handleTestCompletion = async () => {
      if (user.username !== "guest" && !AIMode) {
        await sendTestToBackend();
      } else if (user.username !== "guest" && AIMode) {
        await sendAITestToBackend();
      }
      handleEndTestRedirect();
    };

    if (test.state === 3 && test.finished && test.eventLog.length !== 0) {
      handleTestCompletion();
    }
  }, [test.eventLog, test.state, test.finished, user.username, AIMode]);

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

      const trueWPM =
        (600 * ((totalCorrect - totalIncorrect) / 5)) /
        (test.settings.length - test.timer.timeLeft);
      const rawWPM =
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
    return 0;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        {hideSettings || AIMode ? (
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "15px",
              padding: "1rem",
              width: "20rem",
              minHeight: "1rem",
              maxHeight: "1rem",
            }}
          />
        ) : (
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
        )}
      </div>
      <div style={{ justifyContent: "center", alignSelf: "center" }}>
        <Timer test={test} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          transition: "all .15s ease-out",
        }}
      >
        <TextArea
          user={user}
          aiMode={AIMode}
          test={test}
          selectedDifficulty={test.settings.difficulty}
          passWords={(w) => {
            setTest((prevTest) => ({
              ...prevTest,
              words: {
                ...prevTest.words,
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
              timestamp: e[0]?.timestamp || Date.now(),
              eventLog: e,
            }));
          }}
          onFocus={() => {}}
          onFocusLost={() => {}}
        />
      </div>
      {user.username === "guest" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          In order to save your test you need to log in
        </div>
      )}
    </div>
  );
};

export default Test;
