import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import EndTest from "../../screens/home/homepage/components/endtest/EndTest";
// import EndTest from '../endtest/EndTest';

import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TestPage() {
  const [test, setTest] = useState(null);

  const { id } = useParams();

  async function getTest() {
    try {
      const response = await axios.get("http://localhost:3090/test/" + id);
      setTest(response.data);
    } catch (error) {
      console.error("Failed to fetch test:", error.response.data);
      setTest(error);
    }
  }

  useEffect(() => {
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
          boxSizing: "border-box",
          padding: "2rem",
          overflow: "hidden",
        }}>
        {test == null ? (
          <>LOADING...</>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <div
              style={{
                width: "70%",
                height: "50%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "2em",
                  letterSpacing: "0.07em",
                  fontWeight: "200",
                }}>
                <div style={{}}>
                  <div style={{}}>{test.results.rawWPM.toFixed(2)} raw</div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "600",
                    }}>
                    {test.results.trueWPM.toFixed(2)} wpm
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "5rem",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <div style={{}}>
                    {test.results.accuracy.toFixed(2)}% accuracy
                  </div>
                  <div style={{}}>{getErrors(test)} errors</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#00000020",
                  }}>
                  <EndTest test={test} isAnalysis={true} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    fontSize: "2rem",
                    marginTop: "1rem",
                    fontWeight: "100",
                    alignItems: "center",
                  }}>
                  {/* <a>retry</a> */}
                  <a
                    style={{
                      fontWeight: "600",
                      fontSize: "2rem",

                      marginLeft: "4rem",
                      marginRight: "4rem",
                    }}>
                    next
                  </a>
                  <a>share</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TestPage;
