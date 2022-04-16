import React from "react";
import { nanoid } from 'nanoid';

export default function Questions(props) {

    const items = props.items;
    function createId() {
        const id = nanoid();
        return id;
    }

    let multipleChoiceQuestions = []
    for (let item of items) {
        multipleChoiceQuestions = [...multipleChoiceQuestions, { ...item.incorrect_answers, 3: item.correct_answer, question: item.question }]
    }

    function generateRandIntList() {
        let randIndexList = [0, 1, 2, 3];
        return randIndexList = randIndexList.sort(() => Math.random() - 0.5);
    }

    const [itemsState, setItemsState] = React.useState(finalItems());

    function finalItems() {
        const result = multipleChoiceQuestions.map((obj) => {
            let randomList = generateRandIntList();
            return { ...obj, id: createId(), 0: { id: createId(), button: obj[randomList[0]], isPicked: false }, 1: { id: createId(), button: obj[randomList[1]], isPicked: false }, 2: { id: createId(), button: obj[randomList[2]], isPicked: false }, 3: { id: createId(), button: obj[randomList[3]], isPicked: false }, correct_answer: obj[3] }
        });
        return result;
    }

    function isPickedColor(btnIndex) {
        const styles = {
            backgroundColor: itemsState[btnIndex].isPicked ? "#D6DBF5" : "transparent"
        }
        return styles;
    }

    function handlePick(btn, id) {
        const test = itemsState.map(item => {
            console.log(item)
            return item[btn].id === id ? true :
                false;
        })

        console.log(test)
    }

    console.log(itemsState)

    function createItems() {

        let itemQuestions = itemsState.map(item => {
            return (<div key={createId()} className="questions--container">
                <h1 key={createId()} className="questions--header">{item.question}</h1>
                <button onClick={() => handlePick(0, item[0].id)} style={isPickedColor(0)} key={item[0].id} className="button-1">{item[0].button}</button>
                <button onClick={() => handlePick(1, item[1].id)} style={isPickedColor(1)} key={item[1].id} className="button-2">{item[1].button}</button>
                <button onClick={() => handlePick(2, item[2].di)} style={isPickedColor(2)} key={item[2].id} className="button-3">{item[2].button}</button>
                <button onClick={() => handlePick(3, item[3].id)} style={isPickedColor(3)} key={item[3].id} className="button-4">{item[3].button}</button>
            </div>)
        }
        )
        // console.log(itemQuestions);
        return itemQuestions;
    }

    return (
        <div className="questions">
            {createItems()}
            {props.apiIsFetched && <button className="main-button check-button">Check Answers</button>}
        </div>
    )
}