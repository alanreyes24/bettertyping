import Word from "../word/Word";
import { DEFAULT_CONFIG } from "../constants/textAreaConstants";

/**
 * Generate word components for the text area
 */
export const generateWordComponents = async (
  amount,
  aiMode,
  AIWordList,
  selectedDifficulty,
  retrieveAIWordList
) => {
  if (aiMode && AIWordList.length > 1) {
    // Check for more than just the default " "
    // Only retrieve if we don't have enough words
    if (AIWordList.length < amount) {
      await retrieveAIWordList();
    }

    return Array(amount)
      .fill(false)
      .map((_, i) => (
        <div key={i} className="word">
          <Word word={AIWordList[i % AIWordList.length]} />
        </div>
      ));
  } else {
    return Array(amount)
      .fill(false)
      .map((_, i) => (
        <div key={i} className="word">
          <Word selectedDifficulty={selectedDifficulty} />
        </div>
      ));
  }
};

/**
 * Generate extended word list
 */
export const generateExtendedWords = (
  amount,
  startIndex,
  selectedDifficulty
) => {
  return Array(amount)
    .fill(false)
    .map((_, i) => (
      <div key={i + startIndex} className="word">
        <Word selectedDifficulty={selectedDifficulty} />
      </div>
    ));
};

/**
 * Check if word list should be extended
 */
export const shouldExtendWordList = (
  currentLetterIndex,
  wordListLength,
  testType,
  reset
) => {
  return (
    testType !== "words" &&
    !reset &&
    currentLetterIndex / 5 >=
      wordListLength - DEFAULT_CONFIG.WORD_EXTEND_THRESHOLD
  );
};

/**
 * Get word count based on test settings
 */
export const getWordCount = (testType, settingsCount) => {
  return testType === "words"
    ? settingsCount
    : DEFAULT_CONFIG.DEFAULT_WORD_COUNT;
};
