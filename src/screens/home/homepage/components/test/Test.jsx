import React, { useState, useEffect, useLayoutEffect } from "react";
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
  Legend
);
gsap.registerPlugin(ScrollToPlugin);

const Test = ({ user, AIMode, sendData }) => {
  const handleEndTestRedirect = () => {
    // navigate("/test-finished", { state: { AIMode } });

    sendData(test);
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

  const [test, setTest] = useState({
    userID: "",
    username: "guest",
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
  // const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [settingValue, setSettingValue] = useState(1);
  const [typeValue, setTypeValue] = useState("words");

  //TODO: finish test

  // useEffect(() => {
  //   if (test.state === 3 && !test.finished) {
  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       finished: true,
  //     }));
  //   }
  // }, [test]);

  // TODO: DONT KNOW WHAT THIS DOES

  // useEffect(() => {
  //   if (test.state === 1 && test.userID === "") {
  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       userID: user._id,
  //       username: user.username,
  //     }));
  //   }
  // }, [test.state, user]);

  useEffect(() => {
    // HANDLE TIMER

    if (test.state === 1) {
      //TIMER CODE
      var interval = 100; // ms
      var expected = Date.now() + interval;
      let timeout = setTimeout(step, interval);

      // eslint-disable-next-line no-inner-declarations
      function step() {
        var dt = Date.now() - expected;
        if (dt > interval) {
          // THIS IS BAD
          console.log("something strange happened, timer not working");
        }

        //DECREMENT TIMER
        console.log("DECREMENT");

        if (test.settings.type === "time" && test.timer.timeLeft > 0) {
          setTest((prevTest) => ({
            ...prevTest,
            timer: {
              ...prevTest.timer,
              timeLeft: prevTest.timer.timeLeft - 1,
            },
          }));
        }

        if (test.settings.type === "words") {
          setTest((prevTest) => ({
            ...prevTest,
            timer: {
              ...prevTest.timer,
              timeLeft: prevTest.timer.timeLeft + 1,
            },
          }));
        }

        expected += interval;
        let other = setTimeout(step, Math.max(0, interval - dt)); // take into account drift

        clearTimeout(timeout);
        clearTimeout(other);
      }
    }

    if (test.state == 3) {
      handleEndTestRedirect();
    }
  }, [test.state, test.timer]);

  //WPM LOGGING
  useEffect(() => {
    // console.log(test);

    if (test.timer.timeLeft % 10 == 0 && test.state == 1) {
      let totalCorrect = 0;
      let totalIncorrect = 0;
      for (const value of Object.values(test.words.correctLetters)) {
        totalCorrect += value.length;
      }
      for (const value of Object.values(test.words.incorrectLetters)) {
        totalIncorrect += value.length;
      }

      const calculateWPM = (totalCorrect, totalIncorrect, timeElapsed) => {
        let trueWPM = (600 * ((totalCorrect - totalIncorrect) / 5)) / timeElapsed;
        let rawWPM = (600 * ((totalCorrect + totalIncorrect) / 5)) / timeElapsed;
        return { trueWPM, rawWPM };
      };

      const calculateAccuracy = (totalCorrect, totalIncorrect) => {
        return (totalCorrect / (totalCorrect + totalIncorrect)) * 100;
      };

      const updateResults = (trueWPM, rawWPM, accuracy, totalIncorrect) => {
        setTest((prevTest) => ({
          ...prevTest,
          results: {
            TrueWPM: trueWPM.toFixed(2) * 1,
            RawWPM: rawWPM.toFixed(2) * 1,
            Accuracy: accuracy.toFixed(2) * 1,
            Mistakes: totalIncorrect,
          },
        }));
      };

      const updateChartData = (trueWPM, rawWPM) => {
        setChartData((prevArray) => [
          ...prevArray,
          {
            second: prevArray.length + 1,
            TrueWPM: trueWPM.toFixed(2) * 1,
            RawWPM: rawWPM.toFixed(2) * 1,
          },
        ]);
      };

      if (test.settings.type === "time" || test.settings.type !== "time") {
        const timeElapsed = test.settings.type === "time"
          ? test.settings.length - test.timer.timeLeft
          : test.timer.timeLeft;

        const { trueWPM, rawWPM } = calculateWPM(totalCorrect, totalIncorrect, timeElapsed);
        const accuracy = calculateAccuracy(totalCorrect, totalIncorrect);

        if (
          trueWPM > 0 &&
          !isNaN(trueWPM) &&
          rawWPM > 0 &&
          !isNaN(rawWPM) &&
          accuracy >= 0
        ) {
          updateResults(trueWPM, rawWPM, accuracy, totalIncorrect);
          updateChartData(trueWPM, rawWPM);
        }
        console.log(chartData);
      }
    }
  }, [test.timer.timeLeft]);

  // ON TEST LOAD (state -1)
  //TODO: FEST USER?
  if (test.state === -1) {
    //test
  }

  // CHECK FOR TIMER 0
  if (
    test.state <= 1 &&
    test.timer.timeLeft <= 0 &&
    test.settings.type === "time"
  ) {
    setTest((prevTest) => ({
      ...prevTest,
      state: 3,
      finished: true,
      words: {
        ...prevTest.words,
        chartData: chartData,
      },
    }));
  }

  return (
    <>
      {/* INTRO */}
      <div className="intro pt-32 opacity-0 space-y-4 justify-center text-center self-center mt-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Test Your Typing Speed
        </h1>
        <p className="max-w-2xl self-center text-muted-foreground md:text-xl/relaxed">
          Take a short typing test and we will match you with an individualized
          AI program to improve your skils!
        </p>
      </div>

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
                    ? "Timed, "
                    : "Count, " + test.settings.count}
                  {test.settings.type == "time"
                    ? test.settings.length / 10 + " Seconds"
                    : " Words"}
                </h2>
                <p className="text-muted-foreground">
                  Type as many words as you can in 30 seconds.
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) => {
                cancelTest();
                console.log(value);
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
                <SelectItem value="time">Timed</SelectItem>
                <SelectItem value="words">Count</SelectItem>
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
            aiMode={AIMode}
            test={test}
            selectedDifficulty={test.settings.difficulty}
            passWords={(w) => {
              setTimeout(() => {
                setTest((prevTest) => ({
                  ...prevTest,
                  words: {
                    ...prevTest.words,
                    wordList: w,
                  },
                }));
              }, 0);
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
                timestamp: e[0]?.timestamp || Date.now(),
                eventLog: e,
              }));
            }}
            onFocus={() => { }}
            reset={resetWords}
            onReset={() => {
              setResetWords(false);
              setTest((prevTest) => ({
                userID: "",
                username: "guest",
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
