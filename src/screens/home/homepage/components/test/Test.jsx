import React, { useState, useEffect } from "react";
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

const Test = ({ user, AIMode }) => {
  const handleEndTestRedirect = () => {
    // navigate("/test-finished", { state: { AIMode } });
  };

  // called if user changes settings during the test
  const cancelTest = () => {
    setResetWords(true);
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
      trueWPMArray: [],
      rawWPMArray: [],
    },
    settings: {
      type: "time",
      length: 300,
      count: 0,
      difficulty: "normal",
    },
    timer: {
      timeLeft: 100,
      isActive: false,
      timerGoesUp: false,
    },
    results: {},
    eventLog: [],
    timestamp: 0,
  });

  const [hideSettings, setHideSettings] = useState(false);
  const [resetWords, setResetWords] = useState(false);
  const [trueWPMArray, setTrueWPMArray] = useState([]);
  const [rawWPMArray, setRawWPMArray] = useState([]);
  const [settingValue, setSettingValue] = useState(2);
  const [typeValue, setTypeValue] = useState("time");

  // TODO: MOVE TO STATE 3

  // useEffect(() => {
  //   if (
  //     test.state <= 1 &&
  //     test.timer.timeLeft === 0 &&
  //     test.settings.type === "time"
  //   ) {
  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       state: 3,
  //     }));
  //   }
  // }, [test]);

  //TODO: finish test

  // useEffect(() => {
  //   if (test.state === 3 && !test.finished) {
  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       finished: true,
  //     }));
  //   }
  // }, [test]);

  // TODO: WPM HANDLING

  // useEffect(() => {
  //   if (test.finished && Object.keys(test.results).length === 0) {
  //     let totalCorrect = 0;
  //     let totalIncorrect = 0;

  //     for (const value of Object.values(test.words.correctLetters)) {
  //       totalCorrect += value.length;
  //     }

  //     for (const value of Object.values(test.words.incorrectLetters)) {
  //       totalIncorrect += value.length;
  //     }

  //     const correctOnlyWPM =
  //       (600 * (totalCorrect / 5)) /
  //       (test.settings.length - test.timer.timeLeft);
  //     const trueWPM =
  //       (600 * ((totalCorrect - totalIncorrect) / 5)) /
  //       (test.settings.length - test.timer.timeLeft);
  //     const rawWPM =
  //       (600 * ((totalCorrect + totalIncorrect) / 5)) /
  //       (test.settings.length - test.timer.timeLeft);

  //     const accuracy = (
  //       (totalCorrect / (totalCorrect + totalIncorrect)) *
  //       100
  //     ).toFixed(2);

  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       results: {
  //         trueWPM: test.settings.type === "time" ? trueWPM : trueWPM * -1,
  //         correctOnlyWPM:
  //           test.settings.type === "time"
  //             ? correctOnlyWPM
  //             : correctOnlyWPM * -1,
  //         rawWPM: test.settings.type === "time" ? rawWPM : rawWPM * -1,
  //         accuracy,
  //       },
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

  // TRY AND MAKE ALL FIT IN ONE USEEFFECT (might not need at all???)
  useEffect(() => {
    console.log(test);

    // HANDLE TIMER
  }, []);

  // ON TEST LOAD (state -1)
  //TODO: FEST USER?
  if (test.state === -1) {
    //test
  }

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
            timeLeft: prevTest.timer.timeLeft - 1,
          },
        }));
      }

      // if (test.settings.type === "words") {
      //   setTest((prevTest) => ({
      //     ...prevTest,
      //     timer: {
      //       timeLeft: prevTest.timer.timeLeft + 1,
      //     },
      //   }));
      // }

      expected += interval;
      let other = setTimeout(step, Math.max(0, interval - dt)); // take into account drift

      console.log(timeout);
      console.log(other);
      clearTimeout(timeout);
      clearTimeout(other);
    }
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
    }));
  }

  // TODO: OLD TIMER
  // if (test.state === 1) {
  //   // setHideSettings(true);

  //   if (test.settings.type === "time" && test.timer.timeLeft > 0) {
  //     setTimeout(() => {
  //       setTest((prevTest) => ({
  //         ...prevTest,
  //         timer: {
  //           ...prevTest.timer,
  //           timeLeft: prevTest.timer.timeLeft - 1,
  //           timerGoesUp: false,
  //         },
  //       }));
  //     }, 100);

  //   } else if (test.settings.type === "words" && test.state === 1) {
  //     setTimeout(() => {
  //       if (test.state === 1) {
  //         setTest((prevTest) => ({
  //           ...prevTest,
  //           timer: {
  //             ...prevTest.timer,
  //             timeLeft: prevTest.timer.timeLeft + 1,
  //             timerGoesUp: true,
  //           },
  //         }));
  //       }
  //     }, 100);
  //   }
  // }

  // TODO: array making

  // useEffect(() => {
  //   if (test.state === 1 && !test.finished) {
  //     setTimeout(() => {
  //       setTrueWPMArray((prevArray) => [
  //         ...prevArray,
  //         calculateWPMs("trueWPM"),
  //       ]);
  //       setRawWPMArray((prevArray) => [...prevArray, calculateWPMs("rawWPM")]);
  //     }, 1000);
  //   }
  // }, [test.state, trueWPMArray]);

  //TODO: graph making + array pushing

  // useEffect(() => {
  //   if (test.finished) {
  //     const convertedTrueWPMArray = trueWPMArray.map((item, index) => ({
  //       x: index,
  //       y: parseFloat(item),
  //     }));
  //     const convertedRawWPMArray = rawWPMArray.map((item, index) => ({
  //       x: index,
  //       y: parseFloat(item),
  //     }));

  //     setTrueWPMArray(convertedTrueWPMArray);
  //     setRawWPMArray(convertedRawWPMArray);

  //     setTest((prevTest) => ({
  //       ...prevTest,
  //       words: {
  //         ...prevTest.words,
  //         trueWPMArray: convertedTrueWPMArray,
  //         rawWPMArray: convertedRawWPMArray,
  //       },
  //     }));
  //   }
  // }, [test.finished]);

  // TODO: END TEST HANDLING

  // useEffect(() => {
  //   const handleTestCompletion = async () => {
  //     if (user.username !== "guest" && !AIMode) {
  //       await sendTestToBackend();
  //     } else if (user.username !== "guest" && AIMode) {
  //       await sendAITestToBackend();
  //     }
  //     if (user.username != "guest") {
  //       handleEndTestRedirect();
  //     }
  //   };

  //   if (test.state === 3 && test.finished && test.eventLog.length !== 0) {
  //     handleTestCompletion();
  //   }

  // }, [test.eventLog, test.state, test.finished, user.username, AIMode]);

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

  const wpmData = {
    datasets: [
      {
        label: "True WPM",
        data: trueWPMArray,
        cubicInterpolationMode: "monotone",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        showLine: true,
        fill: false,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 1)",
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
        pointBorderColor: "#000",
        pointHoverBackgroundColor: "#000",
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
      },
      {
        label: "Raw WPM",
        data: rawWPMArray,
        cubicInterpolationMode: "monotone",
        showLine: true,
        fill: true,
        borderWidth: 1,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 0, 0, 1)",
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        type: "linear",
      },
    },
  };

  return (
    <>
      {/* INTRO */}
      <div className='space-y-4 justify-center text-center self-center mt-16'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          Test Your Typing Speed
        </h1>
        <p className='max-w-2xl self-center text-muted-foreground md:text-xl/relaxed'>
          Take a short typing test and we will match you with an individualized
          AI program to improve your skils!
        </p>
      </div>

      {/* TEST */}
      <div className='w-full mt-16 mx-auto max-w-3xl lg:max-w-6xl rounded-lg shadow-sm bg-card p-6 border'>
        {/* SETTINGS AND TIMER*/}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            {test.state === 1 ? (
              <Timer test={test} />
            ) : (
              <>
                <h2 className='text-2xl font-bold'>
                  {test.settings.type == "time"
                    ? "Timed, "
                    : "Count, " + test.settings.count}
                  {test.settings.type == "time"
                    ? test.settings.length / 10 + " Seconds"
                    : " Words"}
                </h2>
                <p className='text-muted-foreground'>
                  Type as many words as you can in 30 seconds.
                </p>
              </>
            )}
          </div>

          <div className='flex items-center gap-2'>
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
              defaultValue='time'>
              <SelectTrigger
                onFocus={(e) => {
                  cancelTest();
                }}
                id='type'
                aria-label='Select Type'>
                <SelectValue placeholder='Select Test' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='time'>Timed</SelectItem>
                <SelectItem value='words'>Words</SelectItem>
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
              defaultValue={2}>
              <SelectTrigger
                onFocus={(e) => {
                  cancelTest();
                }}
                id='length'
                aria-label='Select Length'>
                <SelectValue placeholder='Select Length' />
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
        <div className='flex justify-center m-4 '>
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
              console.log("yes");
              // setTimeout(() => {
              setTest((prevTest) => ({
                ...prevTest,
                words: {
                  ...prevTest.words,
                  correctLetters: l,
                },
              }));
              // }, 0);
            }}
            passIncorrectLetters={(l) => {
              setTimeout(() => {
                setTest((prevTest) => ({
                  ...prevTest,
                  words: {
                    ...prevTest.words,
                    incorrectLetters: l,
                  },
                }));
              }, 0);
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
              setTimeout(() => {
                setTest((prevTest) => ({
                  ...prevTest,
                  timestamp: e[0]?.timestamp || Date.now(),
                  eventLog: e,
                }));
              }, 0);
            }}
            onFocus={() => {}}
            reset={resetWords}
            onReset={() => {
              setResetWords(false);
              //reset test
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
                  trueWPMArray: [],
                  rawWPMArray: [],
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
