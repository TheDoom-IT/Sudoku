import React, { useState } from 'react';
import '../styles/home.css'
import { PLAY_LINK } from './constants';
import { LinkButton } from '../components/link-button';
import { DIFFICULTY, DifficultyPicker } from '../components/difficulty-picker/difficulty-picker';
import { FiPlay } from "react-icons/fi";

export function Home() {
    const [difficulty, setDifficulty] = useState(DIFFICULTY.MEDIUM)

    const onDifficultyChange = (diff: DIFFICULTY) => {
        setDifficulty(diff);
    }

    return <div className='home'>
        <h1>SUDOKU</h1>
        <div className='body'>
            <DifficultyPicker onDifficultyChange={onDifficultyChange} difficulty={difficulty} />
            <div className='button-container'>
                <LinkButton className='button' to={PLAY_LINK(difficulty)} ><FiPlay />PLAY</LinkButton>
            </div>
        </div>
    </div >
}