import React, { useEffect, useState, useRef } from "react";
import "./SettingsStyles.css";

function Settings({ hideModal, passSettings }) {
  const [settings, setSettings] = useState({
    modalVisible: false,
    testType: "time",
    testLength: 300,
    testWordCount: 50,
    testDifficulty: "normal",
  });

  const modalRef = useRef(null);

  useEffect(() => {
    passSettings({
      type: settings.testType,
      length: settings.testLength,
      count: settings.testWordCount,
      difficulty: settings.testDifficulty,
    });
  }, [settings]);

  useEffect(() => {
    if (settings.modalVisible) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        modalVisible: !hideModal,
      }));
    }
  }, [hideModal]);

  const toggleModalVisibility = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      modalVisible: !prevSettings.modalVisible,
    }));
  };

  const updateSetting = (key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSettings((prevSettings) => ({
          ...prevSettings,
          modalVisible: false,
        }));
      }
    };

    if (settings.modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settings.modalVisible]);

  return settings.modalVisible ? (
    <div className="modal__container" ref={modalRef}>
      <div className="modal__subcontainer">
        <div className="modal__title" style={{ alignSelf: "center" }}>
          type
        </div>
        <div className="modal__option__container">
          <div
            className={
              settings.testType === "time"
                ? "modal__option selected"
                : "modal__option"
            }
          >
            <a onClick={() => updateSetting("testType", "time")}>time</a>
          </div>
          <div
            className={
              settings.testType === "words"
                ? "modal__option selected"
                : "modal__option"
            }
            style={{ marginLeft: "3rem" }}
          >
            <a onClick={() => updateSetting("testType", "words")}>words</a>
          </div>
        </div>
      </div>

      <div className="modal__subcontainer">
        <div className="modal__title" style={{ alignSelf: "center" }}>
          difficulty
        </div>
        <div className="modal__option__container">
          <div
            className={
              settings.testDifficulty === "easy"
                ? "modal__option selected"
                : "modal__option"
            }
          >
            <a onClick={() => updateSetting("testDifficulty", "easy")}>easy</a>
          </div>
          <div
            className={
              settings.testDifficulty === "normal"
                ? "modal__option selected"
                : "modal__option"
            }
            style={{ marginLeft: "3rem" }}
          >
            <a onClick={() => updateSetting("testDifficulty", "normal")}>
              normal
            </a>
          </div>
          <div
            className={
              settings.testDifficulty === "hard"
                ? "modal__option selected"
                : "modal__option"
            }
            style={{ marginLeft: "3rem" }}
          >
            <a onClick={() => updateSetting("testDifficulty", "hard")}>hard</a>
          </div>
        </div>
      </div>

      {settings.testType === "time" ? (
        <div className="modal__subcontainer">
          <div className="modal__title">length</div>
          <div className="modal__option__container">
            <div
              className={
                settings.testLength === 150
                  ? "modal__option selected"
                  : "modal__option"
              }
            >
              <a onClick={() => updateSetting("testLength", 150)}>15</a>
            </div>
            <div
              className={
                settings.testLength === 300
                  ? "modal__option selected"
                  : "modal__option"
              }
              style={{ marginLeft: "2rem" }}
            >
              <a onClick={() => updateSetting("testLength", 300)}>30</a>
            </div>
            <div
              className={
                settings.testLength === 600
                  ? "modal__option selected"
                  : "modal__option"
              }
              style={{ marginLeft: "2rem" }}
            >
              <a onClick={() => updateSetting("testLength", 600)}>60</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal__subcontainer">
          <div className="modal__title">count</div>
          <div className="modal__option__container">
            <div
              className={
                settings.testWordCount === 25
                  ? "modal__option selected"
                  : "modal__option"
              }
            >
              <a onClick={() => updateSetting("testWordCount", 25)}>25</a>
            </div>
            <div
              className={
                settings.testWordCount === 50
                  ? "modal__option selected"
                  : "modal__option"
              }
              style={{ marginLeft: "2rem" }}
            >
              <a onClick={() => updateSetting("testWordCount", 50)}>50</a>
            </div>
            <div
              className={
                settings.testWordCount === 100
                  ? "modal__option selected"
                  : "modal__option"
              }
              style={{ marginLeft: "2rem" }}
            >
              <a onClick={() => updateSetting("testWordCount", 100)}>100</a>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <a onClick={toggleModalVisibility}>
      <div className="modal__small__container">
        <div className="modal__small__option">
          {settings.testType} {settings.testLength / 10}
        </div>
        {settings.testType !== "time" && (
          <div className="modal__small__option">{settings.testWordCount}</div>
        )}
        <div className="modal__small__option">
          {settings.testDifficulty} difficulty
        </div>
        <div className="modal__edit__option">edit</div>
      </div>
    </a>
  );
}

export default Settings;
