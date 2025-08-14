import { TEST_SETTINGS, TEST_TYPES } from "../constants/testConstants";

/**
 * Calculate WPM (Words Per Minute) metrics
 */
export const calculateWPM = (totalCorrect, totalIncorrect, timeElapsed) => {
  if (timeElapsed <= 0) return { trueWPM: 0, rawWPM: 0 };

  const trueWPM = (600 * ((totalCorrect - totalIncorrect) / 5)) / timeElapsed;
  const rawWPM = (600 * ((totalCorrect + totalIncorrect) / 5)) / timeElapsed;

  return {
    trueWPM: Math.max(0, trueWPM),
    rawWPM: Math.max(0, rawWPM),
  };
};

/**
 * Calculate typing accuracy percentage
 */
export const calculateAccuracy = (totalCorrect, totalIncorrect) => {
  const total = totalCorrect + totalIncorrect;
  if (total === 0) return 0;
  return (totalCorrect / total) * 100;
};

/**
 * Get test settings based on type and setting value
 */
export const getTestSettings = (type, settingValue) => {
  const setting =
    Object.values(TEST_SETTINGS).find((s) => s.value === settingValue) ||
    TEST_SETTINGS.SHORT;

  return {
    length: type === TEST_TYPES.TIME ? setting.time : 0,
    count: setting.words,
    timeLeft: type === TEST_TYPES.TIME ? setting.time : 0,
    timerGoesUp: type !== TEST_TYPES.TIME,
  };
};

/**
 * Count total letters from letter arrays
 */
export const countTotalLetters = (letterArrays) => {
  return Object.values(letterArrays).reduce((total, array) => {
    return total + (Array.isArray(array) ? array.length : 0);
  }, 0);
};

/**
 * Validate WPM values to ensure they are positive and not NaN
 */
export const isValidWPM = (trueWPM, rawWPM, accuracy) => {
  return (
    trueWPM > 0 &&
    !isNaN(trueWPM) &&
    rawWPM > 0 &&
    !isNaN(rawWPM) &&
    accuracy >= 0 &&
    !isNaN(accuracy)
  );
};

/**
 * Format numbers to fixed decimal places
 */
export const formatResult = (value, decimals = 2) => {
  return Number(value.toFixed(decimals));
};

/**
 * Create timer step function with proper cleanup
 */
export const createTimerStep = (interval, onStep) => {
  let timeoutId;
  const expected = Date.now() + interval;

  const step = () => {
    const dt = Date.now() - expected;

    if (dt > interval) {
      console.warn("Timer drift detected:", dt - interval, "ms");
    }

    onStep();

    const nextInterval = Math.max(0, interval - dt);
    timeoutId = setTimeout(step, nextInterval);
  };

  timeoutId = setTimeout(step, interval);

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
};
