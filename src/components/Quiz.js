import React from 'react';
import { nanoid } from 'nanoid';

export default function Quiz(props) {
    const questions = props.items;

    function generateKey() {
        return nanoid()
    }

    const changeButtonColor = (buttonID, itemID) => {
        props.changeButtonColor(buttonID, itemID)
    }

    function createQuestions() {
        const items = questions.map(questions => {
            return (
                <div className='questions--container' key={generateKey()}>
                    <h1 className='questions--header' key={questions.id}>{questions.question}</h1>
                    {
                        questions.answerOptions.map(item => {
                            const buttonColor = {
                                backgroundColor: item.isChosen ? "#D6DBF5" : "transparent"
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
            <div>
                {questionList}
            </div>
        </div>
    )
}