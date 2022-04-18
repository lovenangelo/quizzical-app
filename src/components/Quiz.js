import React from 'react';
import { nanoid } from 'nanoid';

export default function Quiz(props) {
    const questions = props.items;

    function generateKey() {
        return nanoid()
    }

    function createQuestions() {

        const questionComponents = questions.map(questions => {
            return (
                <div className='questions--container' key={generateKey()}>
                    <h1 className='questions--header' key={questions.id}>{questions.question}</h1>
                    {
                        questions.answerOptions.map(item => {
                            return <button className='choice-button' key={item.id}>{item.value}</button>
                        })
                    }
                </div>
            )
        })
        return questionComponents
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