import React, { useEffect, useState } from 'react';
import '../styles/play.css'
import { SudokuBoard } from "../components/sudoku-board";
import { ROUTES } from './constants';
import { LinkButton } from '../components/link-button';
import { useAPI } from '../hooks/useAPI';
import { DIFFICULTY } from '../components/difficulty-picker/difficulty-picker';
import { useParams } from 'react-router-dom';
import { BoardState, Coordinates } from '../components/types';
import { WonGamePopup } from '../components/popups/won-game-popup';
import { InvalidSolutionPopup } from '../components/popups/invalid-solution-popup';
import { Button } from '../components/button';
import { AiOutlineCheckCircle, AiOutlineHome } from 'react-icons/ai';

interface PlayParams {
    difficulty: DIFFICULTY
}

export function Play() {
    const { difficulty } = useParams();
    const [board, setBoard] = useState<BoardState | undefined>(undefined);
    const { board: initialBoard, solution, isLoading } = useAPI(difficulty);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        setBoard(initialBoard);
    }, [initialBoard])

    const areBoardEquals = (board1: BoardState, board2: BoardState) => {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (board1[x][y] !== board2[x][y]) {
                    return false;
                }
            }
        }
        return true;
    }

    const onCheckClick = () => {
        if (!board || !solution)
            return;

        setIsCorrect(areBoardEquals(board, solution));
        setShowPopup(true);
    }

    const updateBoard = (cell: Coordinates, digit: number | undefined) => {
        const newBoard = JSON.parse(JSON.stringify(board));

        newBoard[cell.x][cell.y] = digit;
        setBoard(newBoard);
    }

    const popup: JSX.Element = !isCorrect ?
        <WonGamePopup visible={showPopup} hide={() => setShowPopup(false)} /> :
        <InvalidSolutionPopup visible={showPopup} hide={() => setShowPopup(false)} />;

    return <div className='play'>
        {!isLoading && !board && (
            <>
                <p className='message'>Failed to fetch data from the API...</p>
                <LinkButton className='home-button' to={ROUTES.HOME}>Home</LinkButton>
            </>
        )}

        {isLoading && !board && (
            <p className='message'>Loading...</p>
        )}

        {!isLoading && initialBoard && board && (
            <>
                <div className='board-container'>
                    <LinkButton className='button' to={ROUTES.HOME}><AiOutlineHome />Home</LinkButton>
                    <SudokuBoard initialBoard={initialBoard} board={board!} updateBoard={updateBoard} />
                    <Button onClick={onCheckClick} ><AiOutlineCheckCircle />Check</Button>
                </div>
                {popup}
            </>
        )}
    </div>
}