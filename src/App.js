import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from "./components/Quiz"
import { nanoid } from 'nanoid'
import { useEffect, useState } from "react";
import React from 'react'

export default function App() {

  const [items, setItems] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [finalItems, setFinalItems] = useState([])

  useEffect(() => {
    if (!isFetched) {
      fetchItems();
    }
    setFinalItems(questionObject);
  }, [isFetched])

  const fetchItems = async () => {
    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    const data = await res.json()
    setItems(data.results)
    setIsFetched(true)
  }

  const shuffleChoices = () => {
    let randIndexList = [0, 1, 2, 3];
    return randIndexList = randIndexList.sort(() => Math.random() - 0.5);
  }

  const createItemSet = (dataRes) => {
    return dataRes.map(item => {
      return [
        item.incorrect_answers[0],
        item.incorrect_answers[1],
        item.incorrect_answers[2],
        item.correct_answer,
        item.question,
      ]
    })
  }

  const questionObject = () => {
    const questionsAnswersArray = createItemSet(items);
    const array = questionsAnswersArray.map(item => {
      let newRand = shuffleChoices();
      return {
        id: nanoid(),
        question: item[4],
        answerOptions: [
          { value: item[newRand[0]], isChosen: false, id: nanoid() },
          { value: item[newRand[1]], isChosen: false, id: nanoid() },
          { value: item[newRand[2]], isChosen: false, id: nanoid() },
          { value: item[newRand[3]], isChosen: false, id: nanoid() }
        ]

      }
    })
    return array;
  }

  const changeButtonColor = (buttonID, itemID) => {
    setFinalItems((prevItems) => {
      let itemIndex = 0;
      let buttonIndex = 0;
      for (const item of prevItems) {
        if (item.id === itemID) {
          item.answerOptions.forEach(option => {
            if (option.id === buttonID) {
              prevItems[itemIndex].answerOptions[buttonIndex].isChosen = true;
            }
            else {
              option.isChosen = false;
            }
            buttonIndex++;
          });
        }
        itemIndex++;
      }
      return [...prevItems]
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='quiz' element={<Quiz items={finalItems} changeButtonColor={changeButtonColor} />} />
      </Routes>
    </BrowserRouter>
  )
}
