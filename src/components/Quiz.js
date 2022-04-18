import React from 'react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

export default function Quiz(props) {

    const questions = props.items;

    function generateKey() {
        return nanoid()
    }

    const changeButtonColor = (buttonID, itemID) => {
        if (!props.isFinish) props.changeButtonColor(buttonID, itemID)
    }

    function handleQuizResults(item, questions) {
        if (item.isChosen && item.value === questions.correct_answer) {
            return {
                color: "#293264",
                backgroundColor: "#94D7A2",
                border: "none"
            }
        }
        if (item.value === questions.correct_answer) {

            return {
                color: "#293264",
                backgroundColor: "#94D7A2",
                border: "none"
            }
        }
        if (item.isChosen && item.value !== questions.correct_answer) {
            return {
                color: "#8F94AF",
                backgroundColor: "#F6D9DB",
                border: "none"
            }
        }
        if (!item.isChosen && item.value !== questions.correct_answer) {
            return {
                color: "#8F94AF",
                border: "1.5px solid #A1A9CC"
            }
        }
    }

    function createQuestions() {
        const items = questions.map(questions => {
            return (
                <div className='questions--container' key={generateKey()}>
                    <h1 className='questions--header' key={questions.id}>{questions.question}</h1>
                    {
                        questions.answerOptions.map(item => {
                            const buttonColor = props.isFinish ?
                                handleQuizResults(item, questions) :
                                {
                                    backgroundColor: item.isChosen ? "#D6DBF5" : "transparent",
                                }
                            return <button onClick={() => changeButtonColor(item.id, questions.id)} style={buttonColor} className='choice-button' key={item.id}>{item.value}</button>
                        })
                    }
                </div>
            )
        })
        return items
    }

    const questionList = createQuestions();

    return (
        <div className='app--main'>
            {props.isFetched && questionList}
            {props.isFinish &&
                <div className='end-quiz'>
                    <h1 className='questions--header' key={questions.id}>{`You score ${props.score}/10 correct answers`}</h1>
                    <Link to='/'>
                        <button onClick={props.playAgain} className='footer--play-again'>Play Again</button>
                    </Link>
                </div>
            }
            {!props.isFinish && props.isFetched && <button onClick={props.isFinishChangeStyle} className='footer--check-button'>Check Answers</button>}
        </div >
    )
}