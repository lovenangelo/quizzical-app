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
  const [isFinish, setIsFinish] = useState(false)
  const [score, setScore] = useState(0)

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
        item.question
      ]
    })
  }

  const questionObject = () => {
    const questionsAnswersArray = createItemSet(items);
    const array = questionsAnswersArray.map(item => {
      let newRand = shuffleChoices();
      return {
        id: nanoid(),
        correct_answer: item[3],
        question: item[4],
        answerOptions: [
          { value: item[newRand[0]], isChosen: false, id: nanoid() },
          { value: item[newRand[1]], isChosen: false, id: nanoid() },
          { value: item[newRand[2]], isChosen: false, id: nanoid() },
          { value: item[newRand[3]], isChosen: false, id: nanoid() },
        ]
      }
    })
    return array;
  }

  const changeButtonColor = (buttonID, itemID) => {
    setFinalItems((prevItems) => {
      let itemIndex = 0;
      let buttonIndex = 0;

      prevItems.forEach(item => {
        if (item.id === itemID) {
          item.answerOptions.forEach(option => {
            if (option.id === buttonID)
              prevItems[itemIndex].answerOptions[buttonIndex].isChosen = true;
            else
              option.isChosen = false;
            buttonIndex++;
          });
        }
        itemIndex++;
      })
      return [...prevItems]
    })
  }

  const isFinishChangeStyle = () => {
    totalScore()
    setIsFinish(true)
  }

  const resetQuiz = () => {
    setIsFetched(false);
    setIsFinish(false);
    setScore(0);
    setFinalItems([]);
  }

  function totalScore() {
    finalItems.forEach(item => {
      item.answerOptions.forEach(option => {
        if (option.isChosen)
          if (option.value === item.correct_answer) setScore(prev => prev = prev + 1)
      }
      )
    })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='quiz' element={
          <Quiz countCorrect={totalScore}
            score={score} playAgain={resetQuiz} isFetched={isFetched}
            isFinishChangeStyle={isFinishChangeStyle} isFinish={isFinish}
            items={finalItems} changeButtonColor={changeButtonColor} />} />
      </Routes>
    </BrowserRouter>
  )
}
