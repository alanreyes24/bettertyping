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
  useEffect(() => {
    // if (test.state == 3) {
    //   console.log("test finished");
    //   keyboard.rows.forEach((row) => {
    //     row.forEach((keyObj) => {
    //       const lowerKey = keyObj.key.toLowerCase();
    //       if (letterCounts[lowerKey]) {
    //         keyObj.correct = letterCounts[lowerKey].correct;
    //         keyObj.incorrect = letterCounts[lowerKey].incorrect;
    //       }
    //     });
    //   });
    //   console.log(keyboard);
    // }
  }, [test.state]);

  //how?
  //first, scale the three colors based on the total, (low med high)
  //take total * 1/3  = low, 2/3 = med, higher = high

  const [keyboard, setKeyboard] = useState({
    finished: false,
    setting: "incorrect",
    minErrors: 0,
    maxErrors: 6,
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

  //   if (test.words.incorrectLetters != undefined) {
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
    console.log("test finished");

    keyboard.rows.forEach((row) => {
      row.forEach((keyObj) => {
        const lowerKey = keyObj.key.toLowerCase();

        if (letterCounts[lowerKey]) {
          keyObj.correct = letterCounts[lowerKey].correct;
          keyObj.incorrect = letterCounts[lowerKey].incorrect;
        }
      });
    });
    console.log(keyboard);

    const calculateErrorRange = (keyboard) => {
      let minErrors = Infinity;
      let maxErrors = -Infinity;

      keyboard.rows.forEach((row) => {
        row.forEach((keyObj) => {
          if (keyObj.incorrect > 0) {
            minErrors = Math.min(minErrors, keyObj.incorrect);
            maxErrors = Math.max(maxErrors, keyObj.incorrect);
          }
        });
      });

      return { minErrors, maxErrors };
    };

    const { minErrors, maxErrors } = calculateErrorRange(keyboard);

    setKeyboard((prev) => ({
      ...prev,
      finished: true,
      minErrors, // Store the calculated minErrors and maxErrors
      maxErrors,
    }));
  }

  const getHeatmapColor = (obj) => {
    console.log(obj);

    if (obj.incorrect >= 6) {
      return "#ff6753f0";
    } else if (obj.incorrect >= 3) {
      return "#ff675340";
    } else if (obj.incorrect > 0) {
      return "#ff675310";
    } else {
      return "#ff675310";
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
        <div className='grid text-white gap-3 font-bold grid-rows-3 mt-2'>
          {keyboard.rows.map((row, index) => {
            return (
              <div
                key={index}
                className='flex flex-row space-x-4 justify-center'
                style={{ marginLeft: index == 2 ? "-4rem" : "" }}>
                {keyboard.rows[index].map((obj, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: getHeatmapColor(obj),
                      }}
                      className='rounded-md w-12 h-12 flex justify-center items-center hover:scale-105'>
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
            <div className='w-4 h-4 border bg-[#ff675310] self-center mr-2'></div>
            Low &lt; {keyboard.minErrors + 1}
          </div>
          <div className='flex text-lg text-muted-foreground'>
            <div className='w-4 h-4 border bg-[#ff675340] self-center mr-2'></div>
            Medium {keyboard.maxErrors - 1 - (keyboard.minErrors + 1)}
          </div>
          <div className='flex text-lg text-muted-foreground'>
            <div className='w-4 h-4 border bg-[#ff6753f0] self-center mr-2'></div>
            High &gt; {keyboard.maxErrors}
          </div>
        </div>
      </div>

      <div className='w-64 self-center'>
        <Select
          onValueChange={(value) => {
            console.log(value);
          }}
          defaultValue='incorrect'>
          <SelectTrigger id='heatmap' aria-label='Select Filter'>
            <SelectValue placeholder='Select Filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='incorrect'>Incorrect Letters</SelectItem>
            <SelectItem value='correct'>Correct Letters</SelectItem>

            <SelectItem value='largest'>Largest Delay</SelectItem>
            <SelectItem value='smallest'>Smallest Delay</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Heatmap;
