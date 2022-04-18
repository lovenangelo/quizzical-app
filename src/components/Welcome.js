import React from "react";
import { Link } from 'react-router-dom';

export default function Welcome() {
    return (
        <div className="app--main intro">
            <h1 className="intro--header">Quizzical</h1>
            <h4 className="intro--description">Where a wrong answer won't get you fired!</h4>
            <Link to='/quiz'>
                <button className="main-button">Start quiz</button>
            </Link>
        </div>
    )
}