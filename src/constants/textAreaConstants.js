// TextArea constants
export const TEST_STATES = {
  LOADING: -1,
  READY: 0,
  ACTIVE: 1,
  FINISHED: 3,
};

export const DEFAULT_CONFIG = {
  DEFAULT_WORD_COUNT: 50,
  WORD_EXTEND_THRESHOLD: 30,
  WORD_EXTEND_AMOUNT: 30,
  LINE_HEIGHT_REM: 2.5,
};

export const INITIAL_TEXTAREA_STATE = {
  wordList: [],
  wordsLoaded: false,
  correctLetters: {},
  incorrectLetters: {},
  currentLetterIndex: 0,
  currentCorrectLetterArray: [],
  currentIncorrectLetterArray: [],
  currentLetterArrayIndexValue: 0,
  totalCorrectLetters: 1,
  totalCorrectWords: 1,
  deleteLines: 0,
  textTyped: "",
  shouldUpdateCursor: false,
  eventLog: [],
  startTime: 0,
  AIWordList: [" "],
};

export const INPUT_PROPS = {
  autoComplete: "off",
  autoCapitalize: "off",
  autoCorrect: "off",
  "data-gramm": "false",
  "data-gramm_editor": "false",
  "data-enable-grammarly": "false",
  list: "autocompleteOff",
};
