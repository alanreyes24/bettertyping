import { useEffect, useRef } from "react";
import axios from "axios";
import { TEST_STATES, TIMER_CONFIG } from "../constants/testConstants";
import { createTimerStep } from "../utils/testUtils";

/**
 * Custom hook for managing test timer
 */
export const useTestTimer = (test, setTest) => {
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (test.state === TEST_STATES.ACTIVE) {
      const onStep = () => {
        setTest((prevTest) => {
          if (prevTest.state !== TEST_STATES.ACTIVE) return prevTest;

          if (
            prevTest.settings.type === "time" &&
            prevTest.timer.timeLeft > 0
          ) {
            return {
              ...prevTest,
              timer: {
                ...prevTest.timer,
                timeLeft: prevTest.timer.timeLeft - 1,
              },
            };
          } else if (prevTest.settings.type === "words") {
            return {
              ...prevTest,
              timer: {
                ...prevTest.timer,
                timeLeft: prevTest.timer.timeLeft + 1,
              },
            };
          }
          return prevTest;
        });
      };

      cleanupRef.current = createTimerStep(TIMER_CONFIG.INTERVAL_MS, onStep);
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [test.state, setTest]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};

/**
 * Custom hook for managing API calls
 */
export const useTestAPI = () => {
  const sendTestToBackend = async (test) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/test`, test, {
        withCredentials: true,
      });
      return { success: true };
    } catch (error) {
      console.error(
        "Error submitting test:",
        error.response?.data || error.message
      );
      return { success: false, error };
    }
  };

  const sendAITestToBackend = async (test) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/ai/test`, test, {
        withCredentials: true,
      });
      return { success: true };
    } catch (error) {
      console.error(
        "Error submitting AI test:",
        error.response?.data || error.message
      );
      return { success: false, error };
    }
  };

  return { sendTestToBackend, sendAITestToBackend };
};
