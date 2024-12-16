import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

function Heatmap({ test }) {
  const [setting, setSetting] = useState("incorrect");
  const [type, setType] = useState("qwerty");

  const [keyboard, setKeyboard] = useState({
    finished: false,
    setting: "incorrect",
    minErrors: 0,
    maxErrors: 6,
    minCorrect: 0,
    maxCorrect: 6,
    minDelay: 0,
    maxDelay: 1500,
    rows: [
      [
        { key: "Q", incorrect: 0, correct: 0, delay: 0 },
        { key: "W", incorrect: 0, correct: 0, delay: 0 },
        { key: "E", incorrect: 0, correct: 0, delay: 0 },
        { key: "R", incorrect: 0, correct: 0, delay: 0 },
        { key: "T", incorrect: 0, correct: 0, delay: 0 },
        { key: "Y", incorrect: 0, correct: 0, delay: 0 },
        { key: "U", incorrect: 0, correct: 0, delay: 0 },
        { key: "I", incorrect: 0, correct: 0, delay: 0 },
        { key: "O", incorrect: 0, correct: 0, delay: 0 },
        { key: "P", incorrect: 0, correct: 0, delay: 0 },
      ],
      [
        { key: "A", incorrect: 0, correct: 0, delay: 0 },
        { key: "S", incorrect: 0, correct: 0, delay: 0 },
        { key: "D", incorrect: 0, correct: 0, delay: 0 },
        { key: "F", incorrect: 0, correct: 0, delay: 0 },
        { key: "G", incorrect: 0, correct: 0, delay: 0 },
        { key: "H", incorrect: 0, correct: 0, delay: 0 },
        { key: "J", incorrect: 0, correct: 0, delay: 0 },
        { key: "K", incorrect: 0, correct: 0, delay: 0 },
        { key: "L", incorrect: 0, correct: 0, delay: 0 },
      ],
      [
        { key: "Z", incorrect: 0, correct: 0, delay: 0 },
        { key: "X", incorrect: 0, correct: 0, delay: 0 },
        { key: "C", incorrect: 0, correct: 0, delay: 0 },
        { key: "V", incorrect: 0, correct: 0, delay: 0 },
        { key: "B", incorrect: 0, correct: 0, delay: 0 },
        { key: "N", incorrect: 0, correct: 0, delay: 0 },
        { key: "M", incorrect: 0, correct: 0, delay: 0 },
      ],
    ],
  });

  useEffect(() => {
    if (keyboard.finished == true && test.state == 0) {
      setKeyboard((prev) => ({
        finished: false,
        setting: "incorrect",
        minErrors: 0,
        maxErrors: 6,
        minCorrect: 0,
        maxCorrect: 6,
        minDelay: 0,
        maxDelay: 1500,
        rows: [
          [
            { key: "Q", incorrect: 0, correct: 0, delay: 0 },
            { key: "W", incorrect: 0, correct: 0, delay: 0 },
            { key: "E", incorrect: 0, correct: 0, delay: 0 },
            { key: "R", incorrect: 0, correct: 0, delay: 0 },
            { key: "T", incorrect: 0, correct: 0, delay: 0 },
            { key: "Y", incorrect: 0, correct: 0, delay: 0 },
            { key: "U", incorrect: 0, correct: 0, delay: 0 },
            { key: "I", incorrect: 0, correct: 0, delay: 0 },
            { key: "O", incorrect: 0, correct: 0, delay: 0 },
            { key: "P", incorrect: 0, correct: 0, delay: 0 },
          ],
          [
            { key: "A", incorrect: 0, correct: 0, delay: 0 },
            { key: "S", incorrect: 0, correct: 0, delay: 0 },
            { key: "D", incorrect: 0, correct: 0, delay: 0 },
            { key: "F", incorrect: 0, correct: 0, delay: 0 },
            { key: "G", incorrect: 0, correct: 0, delay: 0 },
            { key: "H", incorrect: 0, correct: 0, delay: 0 },
            { key: "J", incorrect: 0, correct: 0, delay: 0 },
            { key: "K", incorrect: 0, correct: 0, delay: 0 },
            { key: "L", incorrect: 0, correct: 0, delay: 0 },
          ],
          [
            { key: "Z", incorrect: 0, correct: 0, delay: 0 },
            { key: "X", incorrect: 0, correct: 0, delay: 0 },
            { key: "C", incorrect: 0, correct: 0, delay: 0 },
            { key: "V", incorrect: 0, correct: 0, delay: 0 },
            { key: "B", incorrect: 0, correct: 0, delay: 0 },
            { key: "N", incorrect: 0, correct: 0, delay: 0 },
            { key: "M", incorrect: 0, correct: 0, delay: 0 },
          ],
        ],
      }));
    }
  }, [test.state]);

  useEffect(() => {
    if (test.state == 4 && keyboard.finished == false) {
      const aggregateLetters = (correctLetters, incorrectLetters) => {
        const counts = {};

        const addCounts = (letterArray, type) => {
          Object.values(letterArray)
            .flat()
            .forEach((letter) => {
              if (!counts[letter]) {
                counts[letter] = { correct: 0, incorrect: 0 };
              }
              counts[letter][type]++;
            });
        };

        addCounts(correctLetters, "correct");
        addCounts(incorrectLetters, "incorrect");

        return counts;
      };

      const letterCounts = aggregateLetters(
        test.words.correctLetters,
        test.words.incorrectLetters
      );

      keyboard.rows.forEach((row) => {
        row.forEach((keyObj) => {
          const lowerKey = keyObj.key.toLowerCase();

          test.eventLog?.forEach((event) => {
            if (event?.typed !== undefined) {
              if (event.typed == lowerKey && keyObj.delay <= event.delay) {
                keyObj.delay = event.delay;
                // keyObj.delay = event.delay;
              }
            }
          });

          if (letterCounts[lowerKey]) {
            keyObj.correct = letterCounts[lowerKey].correct;
            keyObj.incorrect = letterCounts[lowerKey].incorrect;
          }
        });
      });

      const calculateErrorRange = (keyboard) => {
        let minErrors = Infinity;
        let minCorrect = Infinity;
        let minDelay = Infinity;
        let maxErrors = -Infinity;
        let maxCorrect = -Infinity;
        let maxDelay = -Infinity;

        keyboard.rows.forEach((row) => {
          row.forEach((keyObj) => {
            if (keyObj.incorrect > 0) {
              minErrors = Math.min(minErrors, keyObj.incorrect);
              maxErrors = Math.max(maxErrors, keyObj.incorrect);
            }
            if (keyObj.correct > 0) {
              minCorrect = Math.min(minCorrect, keyObj.correct);
              maxCorrect = Math.max(maxCorrect, keyObj.correct);
            }
          });
        });

        //THIS IS THE MOST INNEFFICIENT THING I HAVE EVER DONE, FOR EVERY SINGLE LETTER IT LOOPS THE ENTIRE EVENT LOG ITS SO BAD
        //BUT IT WORKS AND I WANT THINGS THAT WORK MORE THAN NOTHING
        //TODO: RE WRITE THIS IS TERRIBLE

        test.eventLog?.forEach((event) => {
          if (event?.typed !== undefined && event?.typed != " ") {
            if (event.delay > 0 && event.delay < 10000) {
              minDelay = Math.min(minDelay, event.delay);
              maxDelay = Math.max(maxDelay, event.delay);
            }
          }
        });

        return {
          minErrors,
          maxErrors,
          minCorrect,
          maxCorrect,
          minDelay,
          maxDelay,
        };
      };

      const {
        minErrors,
        maxErrors,
        minCorrect,
        maxCorrect,
        minDelay,
        maxDelay,
      } = calculateErrorRange(keyboard);

      setKeyboard((prev) => ({
        ...prev,
        finished: true,
        minErrors,
        minCorrect,
        maxErrors,
        maxCorrect,
        minDelay,
        maxDelay,
      }));
    }
  }, [test]);

  const getHeatmapColor = (obj) => {
    if (setting == "incorrect") {
      const range = keyboard.maxErrors - keyboard.minErrors;
      const lowThreshold = keyboard.minErrors + range / 3;
      const mediumThreshold = keyboard.minErrors + (2 * range) / 3;
      if (obj.incorrect >= mediumThreshold) {
        // High error count
        return "#ff6753f0"; // Dark red
      } else if (obj.incorrect >= lowThreshold) {
        // Medium error count
        return "#ff675340"; // Medium red
      } else if (obj.incorrect > 0) {
        // Low error count
        return "#ff675310"; // Light red
      } else {
        // No errors
        return "#191919f0";
      }
    } else if (setting == "correct") {
      const range = keyboard.maxCorrect - keyboard.minCorrect;
      const lowThreshold = keyboard.minCorrect + range / 3;
      const mediumThreshold = keyboard.minCorrect + (2 * range) / 3;
      if (obj.correct >= mediumThreshold) {
        return "#10ff20";
      } else if (obj.correct >= lowThreshold) {
        return "#10ff2080";
      } else if (obj.correct > 0) {
        return "#10ff2030";
      } else {
        return "#191919f0";
      }
    } else {
      const range = keyboard.maxDelay - keyboard.minDelay;
      const lowThreshold = keyboard.minDelay + range / 3;
      const mediumThreshold = keyboard.minDelay + (2 * range) / 3;

      if (obj.delay >= mediumThreshold) {
        return "#ff6753f0";
      } else if (obj.delay >= lowThreshold) {
        return "#ff675340";
      } else if (obj.delay > 0) {
        return "#ff675310";
      } else {
        return "#191919f0";
      }
    }
  };

  const getThresholdRanges = (min, max) => {
    if (min == max) {
      return {
        low: `${min}`,
        medium: `${min}`,
        high: `${min}`,
      };
    }

    if (min == Infinity || isNaN(max)) {
      return {
        low: `0`,
        medium: `0`,
        high: `0`,
      };
    }

    const range = max - min;
    const lowThreshold = min + range / 3;
    const mediumThreshold = min + (2 * range) / 3;

    let lowEnd = Math.floor(lowThreshold);
    let mediumStart = lowEnd + 1;
    let mediumEnd = Math.floor(mediumThreshold);
    let highStart = mediumEnd + 1;

    if (lowEnd < min) lowEnd = min;
    if (mediumStart > mediumEnd) mediumStart = mediumEnd = lowEnd + 1;
    if (highStart > max) highStart = max;

    return {
      low: `${min} - ${lowEnd}`,
      medium: `${mediumStart} - ${mediumEnd}`,
      high: `${highStart} - ${max}`,
    };
  };

  const rangeFinder = (type) => {
    if (setting == "incorrect") {
      if (type == "low") {
        return getThresholdRanges(keyboard.minErrors, keyboard.maxErrors).low;
      } else if (type == "medium") {
        return getThresholdRanges(keyboard.minErrors, keyboard.maxErrors)
          .medium;
      } else {
        return getThresholdRanges(keyboard.minErrors, keyboard.maxErrors).high;
      }
    } else if (setting == "correct") {
      if (type == "low") {
        return getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect).low;
      } else if (type == "medium") {
        return getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect)
          .medium;
      } else {
        return getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect)
          .high;
      }
    } else {
      if (type == "low") {
        return getThresholdRanges(keyboard.minDelay, keyboard.maxDelay).low;
      } else if (type == "medium") {
        return getThresholdRanges(keyboard.minDelay, keyboard.maxDelay).medium;
      } else {
        return getThresholdRanges(keyboard.minDelay, keyboard.maxDelay).high;
      }
    }
  };

  const settingColor = (type) => {
    if (setting == "incorrect") {
      if (type == "low") {
        return "#ff675310";
      } else if (type == "medium") {
        return "#ff675340";
      } else {
        return "#ff6753f0";
      }
    } else if (setting == "correct") {
      if (type == "low") {
        return "#10ff2040";
      } else if (type == "medium") {
        return "#10ff2080";
      } else {
        return "#10ff20";
      }
    } else {
      if (type == "low") {
        return "#ff675310";
      } else if (type == "medium") {
        return "#ff675340";
      } else {
        return "#ff6753f0";
      }
    }
  };

  return (
    <div className='w-full mx-auto col-span-2 lg:col-span-5 rounded-lg border bg-card p-6 h shadow-sm space-y-4 justify-center flex flex-col'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-bold'>Heatmap</h2>
        <div className='flex items-center justify-between'>
          <p className='text-muted-foreground'>
            A dynamic map of your keystrokes. Hover over a key to see detailed
            statistics
          </p>

          <div className=''>
            <Select
              onValueChange={(value) => {
                console.log(value);
                setType(value);

                if (value == "dvorak") {
                  setKeyboard((prev) => ({
                    ...prev,
                    rows: [
                      [
                        {
                          key: "P",
                          incorrect: keyboard.rows[0][9].incorrect,
                          correct: keyboard.rows[0][9].correct,
                          delay: keyboard.rows[0][9].delay,
                        },
                        {
                          key: "Y",
                          incorrect: keyboard.rows[0][5].incorrect,
                          correct: keyboard.rows[0][5].correct,
                          delay: keyboard.rows[0][5].delay,
                        },
                        {
                          key: "F",
                          incorrect: keyboard.rows[1][3].incorrect,
                          correct: keyboard.rows[1][3].correct,
                          delay: keyboard.rows[1][3].delay,
                        },
                        {
                          key: "G",
                          incorrect: keyboard.rows[1][4].incorrect,
                          correct: keyboard.rows[1][4].correct,
                          delay: keyboard.rows[1][4].delay,
                        },
                        {
                          key: "C",
                          incorrect: keyboard.rows[2][2].incorrect,
                          correct: keyboard.rows[2][2].correct,
                          delay: keyboard.rows[2][2].delay,
                        },
                        {
                          key: "R",
                          incorrect: keyboard.rows[0][3].incorrect,
                          correct: keyboard.rows[0][3].correct,
                          delay: keyboard.rows[0][3].delay,
                        },
                        {
                          key: "L",
                          incorrect: keyboard.rows[1][8].incorrect,
                          correct: keyboard.rows[1][8].correct,
                          delay: keyboard.rows[1][8].delay,
                        },
                      ],
                      [
                        {
                          key: "A",
                          incorrect: keyboard.rows[1][0].incorrect,
                          correct: keyboard.rows[1][0].correct,
                          delay: keyboard.rows[1][0].delay,
                        },
                        {
                          key: "O",
                          incorrect: keyboard.rows[0][8].incorrect,
                          correct: keyboard.rows[0][8].correct,
                          delay: keyboard.rows[0][8].delay,
                        },
                        {
                          key: "E",
                          incorrect: keyboard.rows[0][2].incorrect,
                          correct: keyboard.rows[0][2].correct,
                          delay: keyboard.rows[0][2].delay,
                        },
                        {
                          key: "U",
                          incorrect: keyboard.rows[0][6].incorrect,
                          correct: keyboard.rows[0][6].correct,
                          delay: keyboard.rows[0][6].delay,
                        },

                        {
                          key: "I",
                          incorrect: keyboard.rows[0][7].incorrect,
                          correct: keyboard.rows[0][7].correct,
                          delay: keyboard.rows[0][7].delay,
                        },
                        {
                          key: "D",
                          incorrect: keyboard.rows[1][2].incorrect,
                          correct: keyboard.rows[1][2].correct,
                          delay: keyboard.rows[1][2].delay,
                        },
                        {
                          key: "H",
                          incorrect: keyboard.rows[1][5].incorrect,
                          correct: keyboard.rows[1][5].correct,
                          delay: keyboard.rows[1][5].delay,
                        },
                        {
                          key: "T",
                          incorrect: keyboard.rows[0][4].incorrect,
                          correct: keyboard.rows[0][4].correct,
                          delay: keyboard.rows[0][4].delay,
                        },
                        {
                          key: "N",
                          incorrect: keyboard.rows[2][5].incorrect,
                          correct: keyboard.rows[2][5].correct,
                          delay: keyboard.rows[2][5].delay,
                        },
                        {
                          key: "S",
                          incorrect: keyboard.rows[1][1].incorrect,
                          correct: keyboard.rows[1][1].correct,
                          delay: keyboard.rows[1][1].delay,
                        },
                      ],
                      [
                        {
                          key: "Q",
                          incorrect: keyboard.rows[0][0].incorrect,
                          correct: keyboard.rows[0][0].correct,
                          delay: keyboard.rows[0][0].delay,
                        },

                        {
                          key: "J",
                          incorrect: keyboard.rows[1][6].incorrect,
                          correct: keyboard.rows[1][6].correct,
                          delay: keyboard.rows[1][6].delay,
                        },
                        {
                          key: "K",
                          incorrect: keyboard.rows[1][7].incorrect,
                          correct: keyboard.rows[1][7].correct,
                          delay: keyboard.rows[1][7].delay,
                        },

                        {
                          key: "X",
                          incorrect: keyboard.rows[2][1].incorrect,
                          correct: keyboard.rows[2][1].correct,
                          delay: keyboard.rows[2][1].delay,
                        },

                        {
                          key: "B",
                          incorrect: keyboard.rows[2][4].incorrect,
                          correct: keyboard.rows[2][4].correct,
                          delay: keyboard.rows[2][4].delay,
                        },

                        {
                          key: "M",
                          incorrect: keyboard.rows[2][6].incorrect,
                          correct: keyboard.rows[2][6].correct,
                          delay: keyboard.rows[2][6].delay,
                        },
                        {
                          key: "W",
                          incorrect: keyboard.rows[0][1].incorrect,
                          correct: keyboard.rows[0][1].correct,
                          delay: keyboard.rows[0][1].delay,
                        },
                        {
                          key: "V",
                          incorrect: keyboard.rows[2][3].incorrect,
                          correct: keyboard.rows[2][3].correct,
                          delay: keyboard.rows[2][3].delay,
                        },
                        {
                          key: "Z",
                          incorrect: keyboard.rows[2][0].incorrect,
                          correct: keyboard.rows[2][0].correct,
                          delay: keyboard.rows[2][0].delay,
                        },
                      ],
                    ],
                  }));
                } else {
                  setKeyboard((prev) => ({
                    ...prev,
                    rows: [
                      [
                        {
                          key: "Q",
                          incorrect: keyboard.rows[2][0].incorrect,
                          correct: keyboard.rows[2][0].correct,
                          delay: keyboard.rows[2][0].delay,
                        },
                        {
                          key: "W",
                          incorrect: keyboard.rows[2][6].incorrect,
                          correct: keyboard.rows[2][6].correct,
                          delay: keyboard.rows[2][6].delay,
                        },
                        {
                          key: "E",
                          incorrect: keyboard.rows[1][2].incorrect,
                          correct: keyboard.rows[1][2].correct,
                          delay: keyboard.rows[1][2].delay,
                        },
                        {
                          key: "R",
                          incorrect: keyboard.rows[0][5].incorrect,
                          correct: keyboard.rows[0][5].correct,
                          delay: keyboard.rows[0][5].delay,
                        },
                        {
                          key: "T",
                          incorrect: keyboard.rows[1][7].incorrect,
                          correct: keyboard.rows[1][7].correct,
                          delay: keyboard.rows[1][7].delay,
                        },
                        {
                          key: "Y",
                          incorrect: keyboard.rows[0][1].incorrect,
                          correct: keyboard.rows[0][1].correct,
                          delay: keyboard.rows[0][1].delay,
                        },
                        {
                          key: "U",
                          incorrect: keyboard.rows[1][3].incorrect,
                          correct: keyboard.rows[1][3].correct,
                          delay: keyboard.rows[1][3].delay,
                        },
                        {
                          key: "I",
                          incorrect: keyboard.rows[1][4].incorrect,
                          correct: keyboard.rows[1][4].correct,
                          delay: keyboard.rows[1][4].delay,
                        },
                        {
                          key: "O",
                          incorrect: keyboard.rows[1][1].incorrect,
                          correct: keyboard.rows[1][1].correct,
                          delay: keyboard.rows[1][1].delay,
                        },
                        {
                          key: "P",
                          incorrect: keyboard.rows[0][0].incorrect,
                          correct: keyboard.rows[0][0].correct,
                          delay: keyboard.rows[0][0].delay,
                        },
                      ],
                      [
                        {
                          key: "A",
                          incorrect: keyboard.rows[1][0].incorrect,
                          correct: keyboard.rows[1][0].correct,
                          delay: keyboard.rows[1][0].delay,
                        },
                        {
                          key: "S",
                          incorrect: keyboard.rows[1][9].incorrect,
                          correct: keyboard.rows[1][9].correct,
                          delay: keyboard.rows[1][9].delay,
                        },
                        {
                          key: "D",
                          incorrect: keyboard.rows[1][5].incorrect,
                          correct: keyboard.rows[1][5].correct,
                          delay: keyboard.rows[1][5].delay,
                        },
                        {
                          key: "F",
                          incorrect: keyboard.rows[0][2].incorrect,
                          correct: keyboard.rows[0][2].correct,
                          delay: keyboard.rows[0][2].delay,
                        },
                        {
                          key: "G",
                          incorrect: keyboard.rows[0][3].incorrect,
                          correct: keyboard.rows[0][3].correct,
                          delay: keyboard.rows[0][3].delay,
                        },
                        {
                          key: "H",
                          incorrect: keyboard.rows[1][6].incorrect,
                          correct: keyboard.rows[1][6].correct,
                          delay: keyboard.rows[1][6].delay,
                        },
                        {
                          key: "J",
                          incorrect: keyboard.rows[2][1].incorrect,
                          correct: keyboard.rows[2][1].correct,
                          delay: keyboard.rows[2][1].delay,
                        },
                        {
                          key: "K",
                          incorrect: keyboard.rows[2][2].incorrect,
                          correct: keyboard.rows[2][2].correct,
                          delay: keyboard.rows[2][2].delay,
                        },
                        {
                          key: "L",
                          incorrect: keyboard.rows[0][6].incorrect,
                          correct: keyboard.rows[0][6].correct,
                          delay: keyboard.rows[0][6].delay,
                        },
                      ],
                      [
                        {
                          key: "Z",
                          incorrect: keyboard.rows[2][8].incorrect,
                          correct: keyboard.rows[2][8].correct,
                          delay: keyboard.rows[2][8].delay,
                        },
                        {
                          key: "X",
                          incorrect: keyboard.rows[2][3].incorrect,
                          correct: keyboard.rows[2][3].correct,
                          delay: keyboard.rows[2][3].delay,
                        },
                        {
                          key: "C",
                          incorrect: keyboard.rows[2][4].incorrect,
                          correct: keyboard.rows[2][4].correct,
                          delay: keyboard.rows[2][4].delay,
                        },
                        {
                          key: "V",
                          incorrect: keyboard.rows[2][7].incorrect,
                          correct: keyboard.rows[2][7].correct,
                          delay: keyboard.rows[2][7].delay,
                        },
                        {
                          key: "B",
                          incorrect: keyboard.rows[2][4].incorrect,
                          correct: keyboard.rows[2][4].correct,
                          delay: keyboard.rows[2][4].delay,
                        },
                        {
                          key: "N",
                          incorrect: keyboard.rows[1][8].incorrect,
                          correct: keyboard.rows[1][8].correct,
                          delay: keyboard.rows[1][8].delay,
                        },
                        {
                          key: "M",
                          incorrect: keyboard.rows[2][5].incorrect,
                          correct: keyboard.rows[2][5].correct,
                          delay: keyboard.rows[2][5].delay,
                        },
                      ],
                    ],
                  }));
                }
              }}
              defaultValue='qwerty'>
              <SelectTrigger id='status' aria-label='Select Layout'>
                <SelectValue placeholder='Select Layout' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='qwerty'>Qwerty</SelectItem>
                <SelectItem value='dvorak'>Dvorak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KEYBOARD */}
      <div>
        <div className='grid text-white gap-3 font-bold grid-rows-3 mt-2'>
          {keyboard.rows.map((row, index) => {
            return (
              <div
                key={index}
                className='flex flex-row space-x-4 justify-center'
                style={{
                  marginLeft: index == 2 && type == "qwerty" ? "-4rem" : "",
                  marginRight: index == 2 && type == "dvorak" ? "-6rem" : "",
                }}>
                {keyboard.rows[index].map((obj, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: getHeatmapColor(obj),
                      }}
                      className='rounded-md w-12 h-12 flex justify-center items-center hover:scale-105 border'>
                      {obj.key}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* ATLAS / MEANINGS */}
        <div className='flex flex-row space-x-8 justify-center mt-2'>
          <div className='flex text-lg text-muted-foreground'>
            <div
              style={{
                backgroundColor:
                  setting == "incorrect" ? "#191919f0" : "#191919f0",
              }}
              className='w-4 h-4 border self-center mr-2'></div>
            {0}
          </div>
          <div className='flex text-lg text-muted-foreground'>
            <div
              style={{
                backgroundColor: settingColor("low"),
              }}
              className='w-4 h-4 border self-center mr-2'></div>
            {rangeFinder("low")}
          </div>
          <div className='flex text-lg text-muted-foreground'>
            <div
              style={{
                backgroundColor: settingColor("medium"),
              }}
              className='w-4 h-4 border self-center mr-2'></div>
            {rangeFinder("medium")}
          </div>
          <div className='flex text-lg text-muted-foreground'>
            <div
              style={{
                backgroundColor: settingColor("high"),
              }}
              className='w-4 h-4 border self-center mr-2'></div>
            {rangeFinder("high")}
          </div>
        </div>
      </div>

      <div className='w-64 self-center'>
        <Select
          onValueChange={(value) => {
            setSetting(value);
          }}
          defaultValue='incorrect'>
          <SelectTrigger id='heatmap' aria-label='Select Filter'>
            <SelectValue placeholder='Select Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='incorrect'>Incorrect Letters</SelectItem>
            <SelectItem value='correct'>Correct Letters</SelectItem>

            <SelectItem value='largest'>Keystroke Delay</SelectItem>
            {/* <SelectItem value='smallest'>Smallest Delay</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Heatmap;
