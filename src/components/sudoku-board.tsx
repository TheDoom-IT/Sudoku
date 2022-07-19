import React from 'react';
import { useState } from 'react'
import '../styles/sudoku-board.css'
import { Cell } from './cell'
import { Keyboard } from './keyboard'
import { ActiveCellState, BoardState, Coordinates, KeyboardState } from './types'

const emptyBoard: (number | undefined)[][] = Array(9).fill(Array(9).fill(undefined))

export function SudokuBoard() {
  const [board, setBoard] = useState<BoardState>(emptyBoard)
  const [activeCell, setActiveCell] = useState<ActiveCellState>({ keyboardPosition: { x: 0, y: 0 }, keyboardState: KeyboardState.HIDDEN })

  const isActive = (cords: Coordinates) => {
    return activeCell.cords?.x === cords.x && activeCell.cords?.y === cords.y
  }

  const onCellClick = (cords: Coordinates, position: Coordinates) => {
    if (isActive(cords))
      return setActiveCell({ keyboardPosition: activeCell.keyboardPosition, keyboardState: KeyboardState.HIDE });

    return setActiveCell({ cords: cords, keyboardPosition: position, keyboardState: nextKeyboardState(activeCell.keyboardState) })
  }

  const onKeyboardClick = (digit: number) => {
    if (!activeCell.cords)
      return;

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[activeCell.cords.x][activeCell.cords.y] = digit;
    setBoard(newBoard)
  }


  let cells: JSX.Element[] = []
  for (let y = 0; y < 9; y++) {
    let row: JSX.Element[] = []

    for (let x = 0; x < 9; x++) {
      row.push(<Cell value={board[x][y]} active={isActive({ x, y })} cords={{ x, y }} onClick={onCellClick} key={`${x}${y}`} ></Cell >)
    }
    cells.push(<div className='row' key={y}>{row}</div>)
  }

  return <div className='SudokuBoard'>
    {cells}
    <Keyboard state={activeCell.keyboardState} position={activeCell.keyboardPosition} onKeyboardClick={onKeyboardClick}></Keyboard>
  </div>
}

function nextKeyboardState(currState: KeyboardState): KeyboardState {
  return currState === KeyboardState.SHIFT || currState === KeyboardState.SHOW ? KeyboardState.SHIFT : KeyboardState.SHOW;
}