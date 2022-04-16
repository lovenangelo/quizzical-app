import React from "react";

export default function Intro(props) {
    return (
        <div className="intro">
            <h1 className="intro--header">Quizzical</h1>
            <h4 className="intro--description">Where a wrong answer won't get you fired!</h4>
            <button className="main-button" onClick={props.handleShowIntro}>Start quiz</button>
        </div>
    )
}