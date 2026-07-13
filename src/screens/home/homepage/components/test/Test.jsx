import React, { useState, useEffect, useRef } from "react";
import Timer from "../timer/Timer";
import TextArea from "../textarea/TextArea";
import Settings from "../settings/Settings";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../loginpopup/LoginPopup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);
gsap.registerPlugin(ScrollToPlugin);

const Test = ({ user, sendData }) => {
  const sendTestToBackend = async () => {

    if (test.results.trueWPM < 15 || test.results.accuracy < 50 || test.settings.length - test.timer.timeLeft > 100) {
      test.isValid = false;
    }

    console.log(test.words.wordList);

    console.log("above was word list");

    if (test.userID === "") {

      test.userID = "guest";
      test.username = "guest";

      try {
        console.log("SENDING GUEST TEST!");
        await axios.post(
          `${import.meta.env.VITE_API_URL}/test/guest`,
          test,

          {},
        );
      } catch (error) {
        console.error("Error submitting test:", error.response?.data);
      }
    } else {
      try {
        console.log("SENDING!");
        await axios.post(`${import.meta.env.VITE_API_URL}/test`, test, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Error submitting test:", error.response?.data);
      }
    }
  };
  const handleEndTest = () => {
    // weird things happen (its sent twice) while timestamp is 0 (i have no idea awhy)

    if (test.timestamp != 0) {
      console.log("sending from end test");

      sendTestToBackend()
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setSent(true);
        });
    }

    //send data out to homepage
    sendData(test);

    //SCROLLING ANIMATION
    gsap.to(".analysis", { display: "block" });
    gsap.to(".analysis", { opacity: 1, duration: 0.4, delay: 0.25 });
    gsap.to(window, { duration: 1.1, delay: 0.25, scrollTo: ".analysis" });
  };

  // called if user changes settings during the test
  const cancelTest = () => {
    setResetWords(true);
    setChartData([]);
    gsap.to(".analysis", { opacity: 0, duration: 0.4, delay: 0 });
    gsap.to(".analysis", { display: "none", duration: 0.4, delay: 0.4 });
    gsap.to(window, { duration: 0.5, delay: 0, scrollTo: 0 });
  };

  const [test, setTest] = useState({
    userID: "guest",
    username: "guest",
    testID: 0,
    state: -1,
    finished: false,
    isValid: true,
    words: {
      wordList: [],
      attemptedWords: 0,
      correctLetters: [],
      incorrectLetters: [],
      chartData: [],
    },
    settings: {
      type: "words",
      length: 150,
      count: 25,
      difficulty: "normal",
    },
    timer: {
      timeLeft: 0,
      isActive: false,
      timerGoesUp: false,
    },
    results: {},
    eventLog: [],
    timestamp: 0,
  });

  const [hideSettings, setHideSettings] = useState(false);
  const [resetWords, setResetWords] = useState(false);
  const [chartData, setChartData] = useState([]);

  const [settingValue, setSettingValue] = useState(1);
  const [typeValue, setTypeValue] = useState("words");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setTest((prevTest) => ({
      ...prevTest,
      sent: sent,
    }));

    sendData(test);
  }, [sent]);

  useEffect(() => {
    if (test.state == 1 && test.userID === "") {
      setTest((prevTest) => ({
        ...prevTest,
        userID: user._id,
        username: user.username,
      }));
    }
  }, [test.state, test.user, user]);

  useEffect(() => {
    setTest((prevTest) => ({
      ...prevTest,
      userID: user._id,
      username: user.username,
    }));
  }, [user]);

  useEffect(() => {
    if (test.state == 1) {
      console.log("playing");
      // playReplay();
    } else if (test.state == 2) {
      console.log("paused");
    } else if (test.state == 3) {
      console.log("finished");
    } else if (test.state == -1) {
      console.log("resetting");
    }
  }, [test.state]);

  // TIMER
  // timeLeft is in deciseconds and is derived from wall-clock time, so late
  // or throttled ticks (heavy load, background tab) can't stretch a "second".
  const timerStartRef = useRef(null);
  const lastSampledSecondRef = useRef(0);

  useEffect(() => {
    if (test.state !== 1) {
      timerStartRef.current = null;
      return;
    }

    setSent(false);
    timerStartRef.current = Date.now();
    lastSampledSecondRef.current = 0;
    const { type, length } = test.settings;

    const intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - timerStartRef.current) / 100);
      setTest((prevTest) => ({
        ...prevTest,
        timer: {
          ...prevTest.timer,
          timeLeft: type === "time" ? Math.max(0, length - elapsed) : elapsed,
        },
      }));
    }, 100);

    return () => clearInterval(intervalId);
  }, [test.state]);

  // TIMED TEST RAN OUT
  useEffect(() => {
    if (
      test.state === 1 &&
      test.settings.type === "time" &&
      test.timer.timeLeft <= 0
    ) {
      setTest((prevTest) => ({
        ...prevTest,
        userID: user._id,
        username: user.username,
        state: 3,
        finished: true,
        words: {
          ...prevTest.words,
          chartData: chartData,
        },
      }));
    }
  }, [test.state, test.timer.timeLeft, chartData, user]);

  useEffect(() => {
    if (test.state == 4 && !sent) {
      handleEndTest();
      setTest((prevTest) => ({
        ...prevTest,
        state: 5,
      }));
    }
  }, [test.state]);

  const countLetters = (letterArrays) => {
    let total = 0;
    for (const value of Object.values(letterArrays)) {
      total += value.length;
    }
    return total;
  };

  // WPM LOGGING — one sample per elapsed second, even if ticks are skipped
  useEffect(() => {
    if (test.state != 1) return;

    const timeElapsed =
      test.settings.type === "time"
        ? test.settings.length - test.timer.timeLeft
        : test.timer.timeLeft;
    const currentSecond = Math.floor(timeElapsed / 10);

    if (currentSecond <= lastSampledSecondRef.current) return;
    lastSampledSecondRef.current = currentSecond;

    const totalCorrect = countLetters(test.words.correctLetters);
    const totalIncorrect = countLetters(test.words.incorrectLetters);

    // timeElapsed is in deciseconds; 600 deciseconds per minute
    const trueWPM = (600 * ((totalCorrect - totalIncorrect) / 5)) / timeElapsed;
    const rawWPM = (600 * ((totalCorrect + totalIncorrect) / 5)) / timeElapsed;
    const accuracy = (totalCorrect / (totalCorrect + totalIncorrect)) * 100;

    if (trueWPM > 0 && !isNaN(trueWPM) && rawWPM > 0 && !isNaN(rawWPM)) {
      setTest((prevTest) => ({
        ...prevTest,
        results: {
          trueWPM: trueWPM.toFixed(2) * 1,
          rawWPM: rawWPM.toFixed(2) * 1,
          accuracy: accuracy.toFixed(1) * 1,
          mistakes: totalIncorrect,
        },
      }));
      setChartData((prevArray) => [
        ...prevArray,
        {
          second: currentSecond,
          trueWPM: trueWPM.toFixed(2) * 1,
          rawWPM: rawWPM.toFixed(2) * 1,
        },
      ]);
    }
  }, [test.timer.timeLeft, test.state]);

  // FINAL RESULTS — computed from real keystroke timestamps at test end, so
  // the reported WPM doesn't depend on when the last per-second sample landed
  const computeFinalResults = (prevTest, eventLog) => {
    const totalCorrect = countLetters(prevTest.words.correctLetters);
    const totalIncorrect = countLetters(prevTest.words.incorrectLetters);

    // event timestamps are ms since the first keystroke; timed tests always
    // run their full length
    const lastKeystrokeMs = eventLog.length
      ? eventLog[eventLog.length - 1].timestamp
      : 0;
    const elapsedMs =
      prevTest.settings.type === "time"
        ? prevTest.settings.length * 100
        : lastKeystrokeMs;

    if (elapsedMs <= 0 || totalCorrect + totalIncorrect === 0) {
      return prevTest.results;
    }

    const trueWPM = (60000 * ((totalCorrect - totalIncorrect) / 5)) / elapsedMs;
    const rawWPM = (60000 * ((totalCorrect + totalIncorrect) / 5)) / elapsedMs;
    const accuracy = (totalCorrect / (totalCorrect + totalIncorrect)) * 100;

    return {
      trueWPM: Math.max(0, trueWPM.toFixed(2) * 1),
      rawWPM: Math.max(0, rawWPM.toFixed(2) * 1),
      accuracy: accuracy.toFixed(1) * 1,
      mistakes: totalIncorrect,
    };
  };

  return (
    <>
      {/* INTRO */}

      {/* TEST */}
      <div className="test opacity-0 w-full mt-16 mx-auto max-w-3xl lg:max-w-6xl rounded-lg shadow-sm bg-card p-6 border">
        {/* SETTINGS AND TIMER*/}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {test.state === 1 ? (
              <Timer test={test} />
            ) : (
              <>
                <h2 className="text-4xl font-bold">
                  {test.settings.type == "time"
                    ? "timed, "
                    : "count, " + test.settings.count}
                  {test.settings.type == "time"
                    ? test.settings.length / 10 + " seconds"
                    : " words"}
                </h2>
                <p className="text-muted-foreground ml-1">
                  {test.settings.type == "time"
                    ? "type as many words as you can in "
                    : "type these " + test.settings.count}
                  {test.settings.type == "time"
                    ? test.settings.length / 10 + " seconds"
                    : " words as fast as you can!"}
                </p>
              </>
            )}
          </div>
          {/* SETTINGS */}
          <div className="flex items-center gap-2">
            <div className="flex justify-center m-2">
              {test.state == 1 || test.state == 0 ? (
                <button onClick={() => setResetWords(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 22q-1.875 0-3.513-.713t-2.85-1.924q-1.212-1.213-1.924-2.85T3 13h2q0 2.925 2.038 4.963T12 20q2.925 0 4.963-2.038T19 13q0-2.925-2.038-4.963T12 6h-.15l1.55 1.55L12 9L8 5l4-4l1.4 1.45L11.85 4H12q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 22Z"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button onClick={() => window.location.reload()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 22q-1.875 0-3.513-.713t-2.85-1.924q-1.212-1.213-1.924-2.85T3 13h2q0 2.925 2.038 4.963T12 20q2.925 0 4.963-2.038T19 13q0-2.925-2.038-4.963T12 6h-.15l1.55 1.55L12 9L8 5l4-4l1.4 1.45L11.85 4H12q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 22Z"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <Select
              onValueChange={(value) => {
                cancelTest();
                setTypeValue(value);
                setTest((prevTest) => ({
                  ...prevTest,
                  settings: {
                    ...prevTest.settings,
                    type: value,
                    length:
                      value == "time"
                        ? settingValue == 1
                          ? 150
                          : settingValue == 2
                            ? 300
                            : 600
                        : 0,
                    count:
                      settingValue == 1 ? 25 : settingValue == 2 ? 50 : 100,
                  },
                  timer: {
                    ...prevTest.timer,
                    timeLeft:
                      value == "time"
                        ? settingValue == 1
                          ? 150
                          : settingValue == 2
                            ? 300
                            : 600
                        : 0,
                    timerGoesUp: value == "time" ? false : true,
                  },
                }));
              }}
              defaultValue="words"
            >
              <SelectTrigger
                onFocus={(e) => {
                  cancelTest();
                }}
                id="type"
                aria-label="Select Type"
              >
                <SelectValue placeholder="Select Test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">timed</SelectItem>
                <SelectItem value="words">count</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(v) => {
                setSettingValue(v);
                setTest((prevTest) => ({
                  ...prevTest,
                  settings: {
                    ...prevTest.settings,
                    type: typeValue,
                    length: v == 1 ? 150 : v == 2 ? 300 : 600,
                    count: v == 1 ? 25 : v == 2 ? 50 : 100,
                  },
                  timer: {
                    ...prevTest.timer,
                    timeLeft:
                      typeValue == "time"
                        ? v == 1
                          ? 150
                          : v == 2
                            ? 300
                            : 600
                        : 0,
                    timerGoesUp: typeValue == "time" ? false : true,
                  },
                }));
              }}
              defaultValue={1}
            >
              <SelectTrigger
                onFocus={(e) => {
                  cancelTest();
                }}
                id="length"
                aria-label="Select Length"
              >
                <SelectValue placeholder="Select Length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>
                  {test.settings.type == "time" ? "15 Seconds" : "25 Words"}
                </SelectItem>
                <SelectItem value={2}>
                  {test.settings.type == "time" ? "30 Seconds" : "50 Words"}
                </SelectItem>
                <SelectItem value={3}>
                  {test.settings.type == "time" ? "60 Seconds" : "100 Words"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TEXT AREA */}
        <div className="flex justify-center m-4 ">
          <TextArea
            user={user}
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
              console.log("text finished");
              setTest((prevTest) => ({
                ...prevTest,
                userID: user._id,
                username: user.username,
                state: 3,
                finished: true,
                words: {
                  ...prevTest.words,
                  chartData: chartData,
                },
              }));
            }}
            passEventLog={(e) => {
              setTest((prevTest) => ({
                ...prevTest,
                state: 4,

                timestamp: e[0]?.timestamp || Date.now(),
                eventLog: e,
                results: computeFinalResults(prevTest, e),
              }));
            }}
            onFocus={() => {}}
            reset={resetWords}
            onReset={() => {
              setResetWords(false);
              setTest((prevTest) => ({
                userID: user._id,
                username: user.username,
                testID: 0,
                state: -1,
                finished: false,
                words: {
                  wordList: [],
                  attemptedWords: 0,
                  correctLetters: [],
                  incorrectLetters: [],
                  chartData: [],
                  // trueWPMArray: [],
                  // rawWPMArray: [],
                },
                settings: {
                  type: test.settings.type,
                  length: test.settings.length,
                  count: test.settings.count,
                  difficulty: "normal",
                },
                timer: {
                  timeLeft:
                    typeValue == "time"
                      ? settingValue == 1
                        ? 150
                        : settingValue == 2
                          ? 300
                          : 600
                      : 0,
                  isActive: false,
                  timerGoesUp: test.timer.timerGoesUp,
                },
                results: {},
                eventLog: [],
                timestamp: 0,
              }));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Test;
