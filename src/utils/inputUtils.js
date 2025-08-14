/**
 * Handle user keyboard input
 */
export const processUserInput = (
  inputKey,
  currentLetterIndex,
  startTime,
  domOps,
  dispatch,
  actions
) => {
  // Ignore shift key
  if (inputKey === "Shift") return { shouldContinue: false };

  const currentLetter = domOps.getLetterElement(currentLetterIndex);
  const nextLetter = domOps.getLetterElement(currentLetterIndex + 1);

  if (!currentLetter || currentLetter.textContent === undefined) {
    return { shouldContinue: false };
  }

  const timestamp = Date.now() - startTime;

  // Set start time if not already set
  if (!startTime) {
    dispatch({ type: actions.SET_START_TIME, payload: Date.now() });
  }

  // Add to event log
  dispatch({
    type: actions.ADD_EVENT_LOG,
    payload: {
      timestamp,
      intended: currentLetter.textContent,
      typed: inputKey,
    },
  });

  if (inputKey === "Backspace") {
    return handleBackspace(currentLetterIndex, domOps, dispatch, actions);
  } else {
    return handleCharacterInput(
      inputKey,
      currentLetter,
      nextLetter,
      currentLetterIndex,
      dispatch,
      actions
    );
  }
};

/**
 * Handle backspace input
 */
const handleBackspace = (currentLetterIndex, domOps, dispatch, actions) => {
  if (currentLetterIndex > 0) {
    const lastLetter = domOps.getLetterElement(currentLetterIndex - 1);
    if (lastLetter) {
      lastLetter.classList.remove("correct", "incorrect");
    }

    dispatch({
      type: actions.SET_CURRENT_LETTER_INDEX,
      payload: currentLetterIndex - 1,
    });

    dispatch({
      type: actions.SET_TEXT_TYPED,
      payload: (prev) => prev.slice(0, -1),
    });
  }

  return { shouldContinue: true, isFinished: false };
};

/**
 * Handle character input (non-backspace)
 */
const handleCharacterInput = (
  inputKey,
  currentLetter,
  nextLetter,
  currentLetterIndex,
  dispatch,
  actions
) => {
  const isCorrect = inputKey === currentLetter.textContent;
  const isSpace = currentLetter.textContent === " ";

  // Update text typed
  dispatch({
    type: actions.SET_TEXT_TYPED,
    payload: (prev) => prev + inputKey,
  });

  if (isCorrect) {
    // Correct input
    currentLetter.classList.remove("incorrect");
    currentLetter.classList.add("correct");

    if (!isSpace) {
      dispatch({ type: actions.ADD_CORRECT_LETTER, payload: inputKey });
      dispatch({ type: actions.INCREMENT_CORRECT_LETTERS });
    } else {
      dispatch({ type: actions.INCREMENT_CORRECT_WORDS });
      dispatch({ type: actions.ADD_CORRECT_LETTER, payload: inputKey });
      dispatch({ type: actions.SET_TEXT_TYPED, payload: "" });
    }
  } else {
    // Incorrect input
    currentLetter.classList.add("incorrect");
    dispatch({ type: actions.ADD_INCORRECT_LETTER, payload: inputKey });
  }

  // Move to next letter
  if (nextLetter) {
    nextLetter.classList.add("next");
  }

  dispatch({
    type: actions.SET_CURRENT_LETTER_INDEX,
    payload: currentLetterIndex + 1,
  });

  // Check if test is finished
  const totalLetters = document.getElementsByClassName("letter").length;
  const isFinished = totalLetters === currentLetterIndex + 2;

  return { shouldContinue: true, isFinished };
};

/**
 * Validate input key
 */
export const isValidInputKey = (key) => {
  return key !== "Shift" && key !== "Tab" && key !== "Control" && key !== "Alt";
};
