// TextArea reducer for better state management
import { INITIAL_TEXTAREA_STATE } from "../constants/textAreaConstants";

export const textAreaActions = {
  SET_WORD_LIST: "SET_WORD_LIST",
  SET_WORDS_LOADED: "SET_WORDS_LOADED",
  SET_CURRENT_LETTER_INDEX: "SET_CURRENT_LETTER_INDEX",
  SET_DELETE_LINES: "SET_DELETE_LINES",
  SET_TEXT_TYPED: "SET_TEXT_TYPED",
  SET_CURSOR_UPDATE: "SET_CURSOR_UPDATE",
  SET_START_TIME: "SET_START_TIME",
  SET_AI_WORD_LIST: "SET_AI_WORD_LIST",
  ADD_CORRECT_LETTER: "ADD_CORRECT_LETTER",
  ADD_INCORRECT_LETTER: "ADD_INCORRECT_LETTER",
  UPDATE_LETTER_ARRAYS: "UPDATE_LETTER_ARRAYS",
  ADD_EVENT_LOG: "ADD_EVENT_LOG",
  INCREMENT_CORRECT_LETTERS: "INCREMENT_CORRECT_LETTERS",
  INCREMENT_CORRECT_WORDS: "INCREMENT_CORRECT_WORDS",
  EXTEND_WORD_LIST: "EXTEND_WORD_LIST",
  RESET_STATE: "RESET_STATE",
  UPDATE_ARRAY_INDEX: "UPDATE_ARRAY_INDEX",
  CLEAR_CURRENT_ARRAYS: "CLEAR_CURRENT_ARRAYS",
};

export const textAreaReducer = (state, action) => {
  switch (action.type) {
    case textAreaActions.SET_WORD_LIST:
      return { ...state, wordList: action.payload };

    case textAreaActions.SET_WORDS_LOADED:
      return { ...state, wordsLoaded: action.payload };

    case textAreaActions.SET_CURRENT_LETTER_INDEX:
      return { ...state, currentLetterIndex: action.payload };

    case textAreaActions.SET_DELETE_LINES:
      return { ...state, deleteLines: action.payload };

    case textAreaActions.SET_TEXT_TYPED:
      return { ...state, textTyped: action.payload };

    case textAreaActions.SET_CURSOR_UPDATE:
      return { ...state, shouldUpdateCursor: action.payload };

    case textAreaActions.SET_START_TIME:
      return { ...state, startTime: action.payload };

    case textAreaActions.SET_AI_WORD_LIST:
      return { ...state, AIWordList: action.payload };

    case textAreaActions.ADD_CORRECT_LETTER:
      return {
        ...state,
        currentCorrectLetterArray: [
          ...state.currentCorrectLetterArray,
          action.payload,
        ],
      };

    case textAreaActions.ADD_INCORRECT_LETTER:
      return {
        ...state,
        currentIncorrectLetterArray: [
          ...state.currentIncorrectLetterArray,
          action.payload,
        ],
      };

    case textAreaActions.UPDATE_LETTER_ARRAYS:
      return {
        ...state,
        correctLetters: {
          ...state.correctLetters,
          [state.currentLetterArrayIndexValue]: state.currentCorrectLetterArray,
        },
        incorrectLetters: {
          ...state.incorrectLetters,
          [state.currentLetterArrayIndexValue]:
            state.currentIncorrectLetterArray,
        },
      };

    case textAreaActions.ADD_EVENT_LOG:
      return {
        ...state,
        eventLog: [...state.eventLog, action.payload],
      };

    case textAreaActions.INCREMENT_CORRECT_LETTERS:
      return { ...state, totalCorrectLetters: state.totalCorrectLetters + 1 };

    case textAreaActions.INCREMENT_CORRECT_WORDS:
      return { ...state, totalCorrectWords: state.totalCorrectWords + 1 };

    case textAreaActions.EXTEND_WORD_LIST:
      return {
        ...state,
        wordList: [...state.wordList, ...action.payload],
      };

    case textAreaActions.UPDATE_ARRAY_INDEX:
      return { ...state, currentLetterArrayIndexValue: action.payload };

    case textAreaActions.CLEAR_CURRENT_ARRAYS:
      return {
        ...state,
        currentCorrectLetterArray: [],
        currentIncorrectLetterArray: [],
      };

    case textAreaActions.RESET_STATE:
      return {
        ...INITIAL_TEXTAREA_STATE,
        AIWordList: state.AIWordList, // Preserve AI word list
      };

    default:
      return state;
  }
};
