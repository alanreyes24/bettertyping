// Test configuration constants
export const TEST_STATES = {
  LOADING: -1,
  READY: 0,
  ACTIVE: 1,
  FINISHED: 3,
};

export const TEST_TYPES = {
  TIME: "time",
  WORDS: "words",
};

export const TEST_SETTINGS = {
  SHORT: {
    value: 1,
    time: 150, // 15 seconds in deciseconds
    words: 25,
    label: { time: "15 seconds", words: "25 words" },
  },
  MEDIUM: {
    value: 2,
    time: 300, // 30 seconds in deciseconds
    words: 50,
    label: { time: "30 seconds", words: "50 words" },
  },
  LONG: {
    value: 3,
    time: 600, // 60 seconds in deciseconds
    words: 100,
    label: { time: "60 seconds", words: "100 words" },
  },
};

export const TIMER_CONFIG = {
  INTERVAL_MS: 100,
  WPM_UPDATE_INTERVAL: 10, // Update WPM every 1 second (10 * 100ms)
  WORD_EXTEND_THRESHOLD: 30,
  DEFAULT_WORD_COUNT: 50,
};

export const INITIAL_TEST_STATE = {
  userID: "",
  username: "guest",
  testID: 0,
  state: TEST_STATES.LOADING,
  finished: false,
  words: {
    wordList: [],
    attemptedWords: 0,
    correctLetters: [],
    incorrectLetters: [],
    chartData: [],
  },
  settings: {
    type: TEST_TYPES.WORDS,
    length: TEST_SETTINGS.SHORT.time,
    count: TEST_SETTINGS.SHORT.words,
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
};
