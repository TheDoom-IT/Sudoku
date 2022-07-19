import React from 'react';
import '../styles/home.css'
import { ROUTES } from './constants';
import { LinkButton } from '../components/link-button';

export function Home() {
    return <div className='home'>
        <h1>SUDOKU</h1>
        <div className='button-container'>
            <LinkButton className='button' to={ROUTES.PLAY} >PLAY</LinkButton>
        </div>
    </div >
}