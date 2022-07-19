import React from 'react';
import '../styles/play.css'
import { SudokuBoard } from "../components/sudoku-board";
import { ROUTES } from './constants';
import { LinkButton } from '../components/link-button';

export function Play() {
    return <div className='play'>
        <SudokuBoard />
        <LinkButton className='button' to={ROUTES.HOME}>Home</LinkButton>
    </div>
}