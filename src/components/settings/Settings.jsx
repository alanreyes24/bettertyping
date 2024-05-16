import React from "react";

import "./SettingsStyles.css";

function Settings({ }) {

    const [testType, setTestType] = React.useState("time")
    const [testLength, setTestLength] = React.useState(30)



    return (
        <div className="modal__container">
            <div className="modal__subcontainer">
                <div className="modal__title" style={{ alignSelf: "center" }}>
                    type
                </div>
                <div className="modal__option__container">
                    <div className="modal__option selected" style={{}}>
                        <a onClick={() => {
                            setTestType("time")
                        }} >time</a>
                    </div>
                    <div className="modal__option" style={{ marginLeft: "3rem" }}>
                        <a onClick={() => {
                            setTestType("words")
                        }}>words</a>
                    </div>
                </div>
            </div>

            <div className="modal__subcontainer">
                <div className="modal__title">length</div>
                <div className="modal__option__container">
                    <div className="modal__option" style={{}}>
                        <a onClick={() => {
                            setTestLength(15)
                        }}>15</a>
                    </div>
                    <div
                        className="modal__option selected"
                        style={{ marginLeft: "2rem" }}
                    >
                        <a onClick={() => {
                            setTestLength(30)
                        }}>30</a>
                    </div>
                    <div className="modal__option" style={{ marginLeft: "2rem" }}>
                        <a onClick={() => {
                            setTestLength(60)
                        }}>60</a>
                    </div>
                </div>
            </div>

            <div
                className="modal__close"
                style={{ alignSelf: "flex-end", color: "#FF5757" }}
            >
                <a>close</a>
            </div>
        </div>
    );
}

export default Settings;
