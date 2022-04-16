import React from "react";
import { nanoid } from 'nanoid';

export default function AnswerChoices(props) {
    function generateNewAnswerChoice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
}