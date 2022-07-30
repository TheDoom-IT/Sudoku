import React from "react"
import "../../styles/difficulty-picker.css"
import { Button } from "../button";
import { Option } from "./option";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export enum DIFFICULTY {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

export interface DifficultyPickerProps {
    onDifficultyChange: (diff: DIFFICULTY) => void;
    difficulty: DIFFICULTY;
}

export function DifficultyPicker(props: DifficultyPickerProps) {
    const higherDifficulty = () => {
        const diffs = Object.values(DIFFICULTY);
        const currDiff = diffs.findIndex(diff => diff === props.difficulty);
        if (currDiff < diffs.length - 1) {
            const newDiff = diffs[currDiff + 1];
            props.onDifficultyChange(newDiff);
        }
    }

    const lowerDifficulty = () => {
        const diffs = Object.values(DIFFICULTY);
        const currDiff = diffs.findIndex(diff => diff === props.difficulty);
        if (currDiff > 0) {
            const newDiff = diffs[currDiff - 1];
            props.onDifficultyChange(newDiff);
        }
    }

    return <div className="DifficultyPicker">
        <Button onClick={lowerDifficulty} disabled={props.difficulty === DIFFICULTY.EASY}>
            <AiOutlineArrowLeft />
        </Button>

        <div className="options-holder">
            {Object.values(DIFFICULTY).map(
                diff =>
                    <Option className={classNameForOption(diff, props.difficulty)} active={diff === props.difficulty} key={diff} diff={diff} />
            )}
        </div>

        <Button onClick={higherDifficulty} disabled={props.difficulty === DIFFICULTY.HARD}>
            <AiOutlineArrowRight />
        </Button>
    </div>
}

function classNameForOption(option: DIFFICULTY, currDiff: DIFFICULTY): string {
    if (option === currDiff) {
        return "active";
    }

    const diffs = Object.values(DIFFICULTY);
    const currIndex = diffs.findIndex((el) => el === currDiff);
    const optionIndex = diffs.findIndex(el => el === option)
    if (optionIndex + 1 === currIndex)
        return "innactive left"

    if (optionIndex + 2 === currIndex)
        return "hidden left"

    if (optionIndex - 1 === currIndex)
        return "innactive right"

    if (optionIndex - 2 === currIndex)
        return "hidden right"

    return "hidden"
}