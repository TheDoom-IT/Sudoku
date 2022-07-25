import React from 'react';
import '../styles/play.css'
import { SudokuBoard } from "../components/sudoku-board";
import { ROUTES } from './constants';
import { LinkButton } from '../components/link-button';
import { useAPI } from '../hooks/useAPI';
import { DIFFICULTY } from '../components/difficulty-picker/difficulty-picker';
import { useParams } from 'react-router-dom';

interface PlayParams {
    difficulty: DIFFICULTY
}

export function Play() {
    const { difficulty } = useParams();
    const { board, isLoading } = useAPI(difficulty);

    return <div className='play'>
        {!isLoading && !board && (
            <p>Failed to fetch data from the API...</p>
        )}

        {isLoading && !board && (
            <p>Loading...</p>
        )}

        {!isLoading && board && (<>
            <SudokuBoard initialBoard={board} />
        </>
        )}
        <LinkButton className='button' to={ROUTES.HOME}>Home</LinkButton>
    </div>
}