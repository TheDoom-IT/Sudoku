import React from 'react';
import { useState } from 'react'
import '../styles/SudokuBoard.css'
import { Cell } from './Cell'
import { Keyboard } from './Keyboard'
import { SudokuBoardState, Coordinates, KeyboardState } from './types'

export function SudokuBoard() {
  const [activeCell, setActiveCell] = useState<SudokuBoardState>({ keyboardPosition: { x: 0, y: 0 }, keyboardState: KeyboardState.HIDDEN })

  const isActive = (cords: Coordinates) => {
    return activeCell.cords?.x === cords.x && activeCell.cords?.y === cords.y
  }

  const onCellClick = (cords: Coordinates, position: Coordinates) => {
    if (isActive(cords))
      return setActiveCell({ keyboardPosition: activeCell.keyboardPosition, keyboardState: KeyboardState.HIDE });

    return setActiveCell({ cords: cords, keyboardPosition: position, keyboardState: nextKeyboardState(activeCell.keyboardState) })
  }

  const onKeyboardClick = (digit: number) => {
    console.log(digit)
    // TODO: handle the keyboard click
  }


  let cells: JSX.Element[] = []
  for (let y = 0; y < 9; y++) {
    let row: JSX.Element[] = []

    for (let x = 0; x < 9; x++) {
      row.push(<Cell active={isActive({ x, y })} cords={{ x, y }} onClick={onCellClick} key={`${x}${y}`} ></Cell >)
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