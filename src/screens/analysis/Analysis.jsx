import React, { useEffect } from "react";
import Header from "../../components/header/Header";
// import EndTest from '../endtest/EndTest';
import "./Analysis.css";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Analysis() {
  const [analysisJson, setAnalysisJson] = useState({});

  const [test, setTest] = useState(null);

  // Access your API key (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI("API KEY");

  async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        'You are an AI typing data analyst. Your goal is to analyze a user\'s typing performance from a JSON object and generate a detailed report containing quantitative metrics, potential issues, and timing analysis, without providing practice recommendations. \n\nInput JSON Structure:\n\n\n{\n  "events": [\n    {\n      "timestamp": 0, \n      "intended": "a",\n      "typed": "a"\n    },\n    // ... more events\n  ]\n}\n\n\nOutput JSON Structure:\n\n\n{\n  "dataAnalysis": {   "top3Errors": [\n      {"error": "[Incorrect substitution]", "count": [Number of occurrences]},\n      // ... 2 more error entries ...\n    ],\n    "keystrokeLatency": [Average latency in milliseconds],\n    "potentialIssues": [\n      "Description of potential issue 1",\n      "Description of potential issue 2", \n      // ... more potential issues ...\n    ],\n    "timingAnalysis": [\n      {\n        "word": "[The word typed]",\n        "details": "[Description of timing patterns within the word, only if there are significant pauses or errors]"\n      },\n      // ... analysis for more words ... \n    ] \n  },\n  "strengths": [ \n    "Description of strength 1",\n    "Description of strength 2",\n    // ... more strengths ...\n  ],\n  "weaknesses": [\n    {\n      "type": "[Error Category]", \n      "details": "[Specific error description, including example words]"\n    },\n    // ... more weaknesses ...\n  ]\n}\n\n\nAnalysis Steps:\n\n1. **Reconstruct Typed Words:** Process the `events` array to reconstruct the words the user typed, accurately handling backspaces.\n\n2. **Data-Driven Analysis (for `dataAnalysis` field):**\n\n  * **Top 3 Errors:** Identify the 3 most common incorrect letter substitutions and their occurrence counts.\n   * **Keystroke Latency:** Calculate the average time (in milliseconds) between the intended letter and the typed letter.\n   * **Potential Issues:** Briefly describe any patterns or errors you observe in the data without providing recommendations in this section.\n   * **Timing Analysis:** \n      - For each word (both correct and incorrect):\n        - Calculate the time difference between each consecutive keystroke (typed letter, space, or backspace). \n        - Look for significant variations (e.g., a time difference greater than 300 milliseconds).\n        - If you find significant timing variations, create an entry in the `timingAnalysis` array:\n           - `"word"`: The word.\n           - `"details"`:  A detailed description, including specific time differences between keystrokes, any pauses greater than 300ms, how the timing relates to the letters and any errors, and mentions of backspaces and corrections.\n\n3. **Qualitative Analysis (for `strengths` and `weaknesses` fields):** \n\n   * **Identify and Categorize Errors:**  Categorize errors as: Transposition, Substitution, Omission, Insertion, Double Letter Errors, or Spacebar Errors.\n   * **Analyze Error Patterns:** Consider keyboard layout, similar-sounding letters, word endings, word length, and double letters to identify patterns. \n   * **Identify Strengths:**  Highlight areas where the user performs well (consistent speed, low backspace usage). \n\n4. **Generate the JSON Output:**\n\n* **`dataAnalysis`:** Populate this field with the quantitative data points from step 2.\n* **`strengths`:** Add concise descriptions of the user\'s strengths.\n* **`weaknesses`:**  For each distinct error pattern, create a `weakness` object containing: \n    - `type`: The error category.\n    - `details`: A detailed description with example words. \n\nRemember, the goal is to provide a data-rich analysis without making explicit practice recommendations.  This allows a later model or system to leverage this analysis and generate personalized recommendations based on the identified strengths and weaknesses. \n\n',
    });
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [],
    });

    // const prompt = "Write a story about a magic backpack.";

    const result = await chatSession.sendMessage(
      "make a fake json analysis object, and return it as a string (not as a json object, omit the ```json```, simply just {} and quotes ), and have the user make a couple of errors (5 total)"
    );
    setAnalysisJson(result.response.text());
  }
  const { id } = useParams();

  async function getTest() {
    try {
      const response = await axios.get("http://localhost:3090/test/" + id);
      console.log(response.data);
      setTest(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error.response.data);
      setTest(error);
    }
  }

  useEffect(() => {
    // console.log(analysisJson);
    // console.log(id);

    if (test == null) {
      getTest();
    }
  });

  const getErrors = (test) => {
    let errors = 0;
    Object.keys(test.words.incorrectLetters).forEach(function (key) {
      errors += test.words.incorrectLetters[key].length;
    });
    return errors;
  };

  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          fontSize: "2rem",
        }}>
        <div
          style={{
            display: "row",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "bold",
          }}>
          analysis
        </div>
        {test == null ? (
          <>LOADING...</>
        ) : (
          <>
            {/* <EndTest test={test} /> */}

            <div style={{ display: "flex" }}>
              <div style={{}}>
                <div style={{ margin: "10px", color: "#818181" }}>
                  {test.results.rawWPM.toFixed(2)} raw
                </div>
                <div
                  style={{
                    margin: "10px",
                    fontWeight: "bold",
                    fontSize: "calc(40px + 0.5vw)",
                  }}>
                  {test.results.trueWPM.toFixed(2)} wpm
                </div>
              </div>
              <div>
                <div style={{ margin: "10px", color: "#818181" }}>
                  {test.results.accuracy.toFixed(2)}% accuracy
                </div>
                <div style={{ margin: "10px", color: "#818181" }}>
                  {getErrors(test)} errors
                </div>
              </div>
            </div>
            {/* <a
              onClick={() => {
                run();
              }}>
              run analysis
            </a>
            <div style={{ fontSize: "10px" }}>
              {JSON.stringify(analysisJson)}
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default Analysis;
