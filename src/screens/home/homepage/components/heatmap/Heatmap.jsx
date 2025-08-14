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
      console.log("should reset keyboard");
      setKeyboard((prev) => ({
        finished: false,
        setting: "incorrect",
        minErrors: 0,
        maxErrors: 6,
        minCorrect: 0,
        maxCorrect: 6,
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
    if (test.state == 3 && keyboard.finished == false) {
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

          if (letterCounts[lowerKey]) {
            keyObj.correct = letterCounts[lowerKey].correct;
            keyObj.incorrect = letterCounts[lowerKey].incorrect;
          }
        });
      });

      const calculateErrorRange = (keyboard) => {
        let minErrors = Infinity;
        let minCorrect = Infinity;
        let maxErrors = -Infinity;
        let maxCorrect = -Infinity;

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

        return { minErrors, maxErrors, minCorrect, maxCorrect };
      };

      const { minErrors, maxErrors, minCorrect, maxCorrect } =
        calculateErrorRange(keyboard);

      setKeyboard((prev) => ({
        ...prev,
        finished: true,
        minErrors,
        minCorrect,
        maxErrors,
        maxCorrect,
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
    } else {
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

  return (
    <div className="w-full mx-auto col-span-2 lg:col-span-5 rounded-lg border bg-card p- h shadow-sm space-y-4 justify-center flex flex-col">
      {/* KEYBOARD */}
      <div>
        {/* <div className='grid text-white gap-3 font-bold grid-rows-3 mt-2'>
          <div className='flex flex-row space-x-4 justify-center'>
            <div
              style={{ backgroundColor: heatmapKeyColor(data) }}
              className='rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              Q
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              W
            </div>
            <div className='bg-[#ff6753f0] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              E
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              R
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              T
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              Y
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              U
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              I
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              O
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              P
            </div>
          </div>
          <div className='flex flex-row space-x-4 justify-center'>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              A
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              S
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              D
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              F
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              G
            </div>
            <div className='bg-[#ff6753f0] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              H
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              J
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              K
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              L
            </div>
          </div>
          <div className='flex flex-row -ml-16 space-x-4 justify-center'>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              Z
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              X
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              C
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              V
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              B
            </div>
            <div className='bg-[#ff675340] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              N
            </div>
            <div className='bg-[#ff675310] rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
              M
            </div>
          </div>
        </div> */}
        <div className="grid text-white gap-3 font-bold grid-rows-3 m-10">
          {keyboard.rows.map((row, index) => {
            return (
              <div
                key={index}
                className="flex flex-row space-x-4 justify-center"
                style={{
                  marginLeft: index == 2 && type == "qwerty" ? "-4rem" : "",
                  marginRight: index == 2 && type == "dvorak" ? "-6rem" : "",
                }}
              >
                {keyboard.rows[index].map((obj, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: getHeatmapColor(obj),
                      }}
                      className="rounded-md w-12 h-12 flex justify-center items-center hover:scale-105 border"
                    >
                      {obj.key}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* ATLAS / MEANINGS */}
        {/* <div className="flex flex-row space-x-8 justify-center mt-5">
          <div className="flex text-lg text-muted-foreground">
            <div
              style={{
                backgroundColor:
                  setting == "incorrect" ? "#191919f0" : "#191919f0",
              }}
              className="w-4 h-4 border self-center mr-2"
            ></div>
            {0}
          </div>
          <div className="flex text-lg text-muted-foreground">
            <div
              style={{
                backgroundColor:
                  setting == "incorrect" ? "#ff675310" : "#10ff2040",
              }}
              className="w-4 h-4 border self-center mr-2"
            ></div>
            {setting == "incorrect"
              ? getThresholdRanges(keyboard.minErrors, keyboard.maxErrors).low
              : getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect)
                  .low}
          </div>
          <div className="flex text-lg text-muted-foreground">
            <div
              style={{
                backgroundColor:
                  setting == "incorrect" ? "#ff675340" : "#10ff2080",
              }}
              className="w-4 h-4 border self-center mr-2"
            ></div>
            {setting == "incorrect"
              ? getThresholdRanges(keyboard.minErrors, keyboard.maxErrors)
                  .medium
              : getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect)
                  .medium}
          </div>
          <div className="flex text-lg text-muted-foreground">
            <div
              style={{
                backgroundColor:
                  setting == "incorrect" ? "#ff6753f0" : "#10ff20",
              }}
              className="w-4 h-4 border self-center mr-2"
            ></div>
            {setting == "incorrect"
              ? getThresholdRanges(keyboard.minErrors, keyboard.maxErrors).high
              : getThresholdRanges(keyboard.minCorrect, keyboard.maxCorrect)
                  .high}
          </div>
        </div> */}
      </div>

      <div className="w-44 self-center">
        <Select
          onValueChange={(value) => {
            setSetting(value);
          }}
          defaultValue="incorrect"
        >
          <SelectTrigger id="heatmap" aria-label="Select Filter">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="incorrect">incorrect letters</SelectItem>
            <SelectItem value="correct">correct letters</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Heatmap;
