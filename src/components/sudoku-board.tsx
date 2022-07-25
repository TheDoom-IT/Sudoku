import React, { useEffect } from 'react';
import { useState } from 'react'
import '../styles/sudoku-board.css'
import { Cell } from './cell'
import { Keyboard } from './keyboard'
import { ActiveCellState, BoardState, Coordinates, KeyboardState } from './types'

const emptyBoard: (number | undefined)[][] = Array(9).fill(Array(9).fill(undefined))

export interface SudokuBoardProps {
  initialBoard: BoardState;
}

export function SudokuBoard(props: SudokuBoardProps) {
  const [board, setBoard] = useState<BoardState>(props.initialBoard)
  const [activeCell, setActiveCell] = useState<ActiveCellState>({ keyboardPosition: { x: 0, y: 0 }, keyboardState: KeyboardState.HIDDEN })

  // update the board every time props changes
  useEffect(() => {
    if (board !== props.initialBoard) {
      setBoard(props.initialBoard);
    }
  }, [props.initialBoard]);

  const isActive = (cords: Coordinates) => {
    return activeCell.cords?.x === cords.x && activeCell.cords?.y === cords.y
  }

  const isInitial = (cords: Coordinates) => {
    return props.initialBoard[cords.x][cords.y] !== undefined;
  }

  const onCellClick = (cords: Coordinates, position: Coordinates) => {
    if (isActive(cords) || isInitial(cords))
      return setActiveCell({ keyboardPosition: activeCell.keyboardPosition, keyboardState: KeyboardState.HIDE });

    return setActiveCell({ cords: cords, keyboardPosition: position, keyboardState: nextKeyboardState(activeCell.keyboardState) })
  }

  const onKeyboardClick = (digit: number) => {
    if (!activeCell.cords)
      return;

    const newBoard = JSON.parse(JSON.stringify(board));

    // TODO: Implement remove button
    if (board[activeCell.cords.x][activeCell.cords.y] === digit) {
      newBoard[activeCell.cords.x][activeCell.cords.y] = undefined;
    } else {
      newBoard[activeCell.cords.x][activeCell.cords.y] = digit;
    }
    setBoard(newBoard);
    setActiveCell({ keyboardPosition: activeCell.keyboardPosition, keyboardState: KeyboardState.HIDE });
  }


  let cells: JSX.Element[] = []
  for (let y = 0; y < 9; y++) {
    let row: JSX.Element[] = []

    for (let x = 0; x < 9; x++) {
      row.push(<Cell value={board[x][y]} active={isActive({ x, y })} initial={isInitial({ x, y })} cords={{ x, y }} onClick={onCellClick} key={`${x}${y}`} ></Cell >)
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