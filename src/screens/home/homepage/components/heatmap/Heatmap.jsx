import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LAYOUTS = {
  qwerty: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ],
  dvorak: [
    ["P", "Y", "F", "G", "C", "R", "L"],
    ["A", "O", "E", "U", "I", "D", "H", "T", "N", "S"],
    ["Q", "J", "K", "X", "B", "M", "W", "V", "Z"],
  ],
};

const EMPTY_STAT = { correct: 0, incorrect: 0, delay: 0 };

// Delays above this are pauses (tabbing away, thinking), not typing speed.
const MAX_REASONABLE_DELAY = 10000;

const isLetterKey = (key) => /^[a-z]$/.test(key);

function Heatmap({ test }) {
  const [setting, setSetting] = useState("incorrect");
  const [type, setType] = useState("qwerty");

  // Per-letter stats derived from the finished test. Keyed by the typed
  // character, so they follow the letter across layout switches.
  const stats = useMemo(() => {
    const counts = {};
    if (test.state != 4 || !test.words) return counts;

    const addCounts = (letterArray, statType) => {
      Object.values(letterArray || {})
        .flat()
        .forEach((letter) => {
          const key = String(letter).toLowerCase();
          if (!isLetterKey(key)) return;
          if (!counts[key]) counts[key] = { ...EMPTY_STAT };
          counts[key][statType]++;
        });
    };

    addCounts(test.words.correctLetters, "correct");
    addCounts(test.words.incorrectLetters, "incorrect");

    // Each key shows its slowest keystroke of the test.
    test.eventLog?.forEach((event) => {
      if (!event || typeof event.typed !== "string") return;
      const key = event.typed.toLowerCase();
      if (!isLetterKey(key)) return;
      if (!(event.delay > 0 && event.delay < MAX_REASONABLE_DELAY)) return;
      if (!counts[key]) counts[key] = { ...EMPTY_STAT };
      if (event.delay > counts[key].delay) counts[key].delay = event.delay;
    });

    return counts;
  }, [test]);

  const ranges = useMemo(() => {
    let minErrors = Infinity;
    let maxErrors = -Infinity;
    let minCorrect = Infinity;
    let maxCorrect = -Infinity;
    let minDelay = Infinity;
    let maxDelay = -Infinity;

    Object.values(stats).forEach((stat) => {
      if (stat.incorrect > 0) {
        minErrors = Math.min(minErrors, stat.incorrect);
        maxErrors = Math.max(maxErrors, stat.incorrect);
      }
      if (stat.correct > 0) {
        minCorrect = Math.min(minCorrect, stat.correct);
        maxCorrect = Math.max(maxCorrect, stat.correct);
      }
      if (stat.delay > 0) {
        minDelay = Math.min(minDelay, stat.delay);
        maxDelay = Math.max(maxDelay, stat.delay);
      }
    });

    // Placeholder ranges so the legend reads sensibly before any data exists.
    if (minErrors === Infinity) {
      minErrors = 0;
      maxErrors = 6;
    }
    if (minCorrect === Infinity) {
      minCorrect = 0;
      maxCorrect = 6;
    }
    if (minDelay === Infinity) {
      minDelay = 0;
      maxDelay = 1500;
    }

    return { minErrors, maxErrors, minCorrect, maxCorrect, minDelay, maxDelay };
  }, [stats]);

  const getHeatmapColor = (stat) => {
    if (setting == "incorrect") {
      const range = ranges.maxErrors - ranges.minErrors;
      const lowThreshold = ranges.minErrors + range / 3;
      const mediumThreshold = ranges.minErrors + (2 * range) / 3;
      if (stat.incorrect > 0 && stat.incorrect >= mediumThreshold) {
        return "#ff6753f0"; // Dark red
      } else if (stat.incorrect > 0 && stat.incorrect >= lowThreshold) {
        return "#ff675340"; // Medium red
      } else if (stat.incorrect > 0) {
        return "#ff675310"; // Light red
      } else {
        return "#191919f0";
      }
    } else if (setting == "correct") {
      const range = ranges.maxCorrect - ranges.minCorrect;
      const lowThreshold = ranges.minCorrect + range / 3;
      const mediumThreshold = ranges.minCorrect + (2 * range) / 3;
      if (stat.correct > 0 && stat.correct >= mediumThreshold) {
        return "#10ff20";
      } else if (stat.correct > 0 && stat.correct >= lowThreshold) {
        return "#10ff2080";
      } else if (stat.correct > 0) {
        return "#10ff2030";
      } else {
        return "#191919f0";
      }
    } else {
      const range = ranges.maxDelay - ranges.minDelay;
      const lowThreshold = ranges.minDelay + range / 3;
      const mediumThreshold = ranges.minDelay + (2 * range) / 3;
      if (stat.delay > 0 && stat.delay >= mediumThreshold) {
        return "#ff6753f0";
      } else if (stat.delay > 0 && stat.delay >= lowThreshold) {
        return "#ff675340";
      } else if (stat.delay > 0) {
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

  const rangeFinder = (level) => {
    if (setting == "incorrect") {
      return getThresholdRanges(ranges.minErrors, ranges.maxErrors)[level];
    } else if (setting == "correct") {
      return getThresholdRanges(ranges.minCorrect, ranges.maxCorrect)[level];
    } else {
      return getThresholdRanges(ranges.minDelay, ranges.maxDelay)[level];
    }
  };

  const settingColor = (level) => {
    if (setting == "correct") {
      if (level == "low") {
        return "#10ff2040";
      } else if (level == "medium") {
        return "#10ff2080";
      } else {
        return "#10ff20";
      }
    } else {
      if (level == "low") {
        return "#ff675310";
      } else if (level == "medium") {
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
            <Select onValueChange={(value) => setType(value)} defaultValue='qwerty'>
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
          {LAYOUTS[type].map((row, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className='flex flex-row space-x-4 justify-center'
                style={{
                  marginLeft: rowIndex == 2 && type == "qwerty" ? "-4rem" : "",
                  marginRight: rowIndex == 2 && type == "dvorak" ? "-6rem" : "",
                }}>
                {row.map((key) => {
                  const stat = stats[key.toLowerCase()] || EMPTY_STAT;
                  return (
                    <div
                      key={key}
                      title={`${key}: ${stat.correct} correct, ${stat.incorrect} incorrect, ${stat.delay}ms slowest`}
                      style={{
                        backgroundColor: getHeatmapColor(stat),
                      }}
                      className='rounded-md w-12 h-12 flex justify-center items-center hover:scale-105 border'>
                      {key}
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
                backgroundColor: "#191919f0",
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
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Heatmap;
