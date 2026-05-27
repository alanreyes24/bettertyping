import React, { useState, useEffect, createElement } from "react";

function Word({ selectedDifficulty, word }) {
 
  const [randomWord, setRandomWord] = useState("");

  useEffect(() => {
    let selectedDifficultyArray = [];

    if (word) {
      setRandomWord(word);
    } else {
      if (selectedDifficulty == "easy") {
        selectedDifficultyArray = easyWords;
      } else if (selectedDifficulty == "normal") {
        selectedDifficultyArray = normalWords;
      } else if (selectedDifficulty == "hard") {
        selectedDifficultyArray = hardWords;
      }

      let randomIndex = Math.floor(
        Math.random() * selectedDifficultyArray.length
      );
      let randomWordFromArray = selectedDifficultyArray[randomIndex];
      setRandomWord(randomWordFromArray);
    }
  }, [selectedDifficulty, word]);

  let map = randomWord
    .split("")
    .map((item, index) =>
      createElement("div", { key: index, className: "letter" }, item)
    );
  map.push(
    createElement("div", { key: "space", className: "letter space" }, " ")
  );

  return map;
}

export default Word;
