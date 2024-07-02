// src/components/homepage/HomePage.jsx
import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import Login from "../../../components/login/Login";
import Test from "./components/test/Test";
import axios from "axios";

function HomePage({ user }) {
  const [aiTestMode, setAITestMode] = useState(true);
  const [aiWordList, setAIWordList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  async function retrieveAIWordList() {
    try {
      const response = await axios.get(
        "http://localhost:3090/ai/getAIWordList",
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setAITestMode(true);
        setAIWordList(response.data.practiceWords);
        setIsLoading(false); // Set loading to false upon successful fetch
      } else {
        console.error("Failed to retrieve AI word list:", response.statusText);
      }
    } catch (error) {
      console.error("Error retrieving AI word list:", error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchAIWordList = async () => {
      await retrieveAIWordList();
    };

    fetchAIWordList();
  }, []);

  const [selectedDifficulty, setSelectedDifficulty] = useState("normal");

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <button onClick={() => setSelectedDifficulty("easy")}> easy </button>
      <button onClick={() => setSelectedDifficulty("normal")}> normal </button>
      <button onClick={() => setSelectedDifficulty("hard")}> hard </button>

      {!isLoading && (
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Test
            user={user}
            selectedDifficulty={selectedDifficulty}
            aiTestMode={aiTestMode}
            aiWordList={aiWordList}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
