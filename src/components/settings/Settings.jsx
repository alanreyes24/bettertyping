import React, { useEffect } from "react";

import "./SettingsStyles.css";

function Settings({ passSettings }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [testType, setTestType] = React.useState("time");
    const [testLength, setTestLength] = React.useState(30);
    const [testWordCount, setTestWordCount] = React.useState(50);

    useEffect(() => {
        passSettings({
            type: testType,
            length: testLength,
            count: testWordCount,
        });
    }, [testType, testLength, testWordCount, passSettings]);

    return (

        modalVisible ? (
            <div className="modal__container">
                <div className="modal__subcontainer">
                    <div className="modal__title" style={{ alignSelf: "center" }}>
                        type
                    </div>
                    <div className="modal__option__container">
                        <div
                            className={
                                testType == "time" ? "modal__option selected" : "modal__option"
                            }
                        >
                            <a
                                onClick={() => {
                                    setTestType("time");
                                }}
                            >
                                time
                            </a>
                        </div>
                        <div
                            className={
                                testType == "words" ? "modal__option selected" : "modal__option"
                            }
                            style={{ marginLeft: "3rem" }}
                        >
                            <a
                                onClick={() => {
                                    setTestType("words");
                                }}
                            >
                                words
                            </a>
                        </div>
                    </div>
                </div>

                {testType == "time" ? (
                    <div className="modal__subcontainer">
                        <div className="modal__title">length</div>

                        <div className="modal__option__container">
                            <div
                                className={
                                    testLength == 15 ? "modal__option selected" : "modal__option"
                                }
                            >
                                <a
                                    onClick={() => {
                                        setTestLength(15);
                                    }}
                                >
                                    15
                                </a>
                            </div>
                            <div
                                className={
                                    testLength == 30 ? "modal__option selected" : "modal__option"
                                }
                                style={{ marginLeft: "2rem" }}
                            >
                                <a
                                    onClick={() => {
                                        setTestLength(30);
                                    }}
                                >
                                    30
                                </a>
                            </div>
                            <div
                                className={
                                    testLength == 60 ? "modal__option selected" : "modal__option"
                                }
                                style={{ marginLeft: "2rem" }}
                            >
                                <a
                                    onClick={() => {
                                        setTestLength(60);
                                    }}
                                >
                                    60
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="modal__subcontainer">
                        <div className="modal__title">count</div>

                        <div className="modal__option__container">
                            <div
                                className={
                                    testWordCount == 25 ? "modal__option selected" : "modal__option"
                                }
                            >
                                <a
                                    onClick={() => {
                                        setTestWordCount(25);
                                    }}
                                >
                                    25
                                </a>
                            </div>
                            <div
                                className={
                                    testWordCount == 50 ? "modal__option selected" : "modal__option"
                                }
                                style={{ marginLeft: "2rem" }}
                            >
                                <a
                                    onClick={() => {
                                        setTestWordCount(50);
                                    }}
                                >
                                    50
                                </a>
                            </div>
                            <div
                                className={
                                    testWordCount == 100
                                        ? "modal__option selected"
                                        : "modal__option"
                                }
                                style={{ marginLeft: "2rem" }}
                            >
                                <a
                                    onClick={() => {
                                        setTestWordCount(100);
                                    }}
                                >
                                    100
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <div
                    className="modal__close"
                    style={{ alignSelf: "flex-end", color: "#FF5757" }}
                >
                    <a onClick={() => {
                        setModalVisible(!modalVisible)
                    }}>close</a>
                </div>
            </div>) :
            <a onClick={() => {
                setModalVisible(!modalVisible)
            }}>
                <div className="modal__small__container">

                    <div style={{ display: 'flex', flex: 1, opacity: 1 }}></div>
                    <div style={{ display: 'flex', flex: 1, }}>
                        <div style={{ paddingRight: '0.5rem' }} className="modal__small__option">{testType}</div>
                        {testType == "time" ? (<div className="modal__small__option">{testLength}</div>) : (<div className="modal__small__option">{testWordCount}</div>)}
                    </div>

                    <div style={{ fontWeight: '200', display: 'flex', flex: 1, }}>edit</div>


                    {/* <div></div> */}

                </div>

            </a>

    );
}

export default Settings;
