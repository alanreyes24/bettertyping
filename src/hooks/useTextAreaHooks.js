import { useEffect, useRef, useCallback } from "react";
import axios from "axios";

/**
 * Custom hook for managing AI word list
 */
export const useAIWordList = (aiMode, dispatch, textAreaActions) => {
  const retrieveAIWordList = useCallback(async () => {
    if (!aiMode) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ai/getAIWordList`,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: textAreaActions.SET_AI_WORD_LIST,
          payload: response.data.practiceWords,
        });
      } else {
        console.error("Failed to retrieve AI word list:", response.statusText);
      }
    } catch (error) {
      console.error("Error retrieving AI word list:", error.message);
    }
  }, [aiMode, dispatch, textAreaActions]);

  return { retrieveAIWordList };
};

/**
 * Custom hook for handling DOM operations (to be replaced with React refs)
 */
export const useDOMOperations = () => {
  const inputRef = useRef(null);
  const cursorRef = useRef(null);

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const updateCursor = useCallback((shouldBlink, testState) => {
    if (cursorRef.current) {
      if (shouldBlink && testState === 0) {
        cursorRef.current.classList.add("cursorBlink");
      } else {
        cursorRef.current.classList.remove("cursorBlink");
      }
    }
  }, []);

  const getOffset = useCallback((element) => {
    if (!element) return { left: 0, top: 0 };
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }, []);

  // This is still using DOM manipulation - ideally should be replaced with React refs
  const getLetterElement = useCallback((index) => {
    const letters = document.getElementsByClassName("letter");
    return letters[index] || null;
  }, []);

  return {
    inputRef,
    cursorRef,
    focusInput,
    updateCursor,
    getOffset,
    getLetterElement,
  };
};

/**
 * Custom hook for handling line shifting logic
 */
export const useLineShifting = (
  state,
  dispatch,
  textAreaActions,
  domOps,
  test
) => {
  useEffect(() => {
    if (test.state === 1) {
      const currentLetter = domOps.getLetterElement(
        state.currentLetterIndex - 1
      );
      const nextLetter = domOps.getLetterElement(state.currentLetterIndex);

      if (currentLetter && nextLetter) {
        const currentOffset = domOps.getOffset(currentLetter);
        const nextOffset = domOps.getOffset(nextLetter);

        if (nextOffset.top > currentOffset.top) {
          dispatch({
            type: textAreaActions.SET_DELETE_LINES,
            payload: state.deleteLines + 1,
          });
        } else if (nextOffset.top < currentOffset.top) {
          dispatch({
            type: textAreaActions.SET_DELETE_LINES,
            payload: state.deleteLines - 1,
          });
        }
      }
    }
  }, [
    state.currentLetterIndex,
    test.state,
    state.deleteLines,
    dispatch,
    textAreaActions,
    domOps,
  ]);
};
