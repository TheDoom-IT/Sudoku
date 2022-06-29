import { useState } from 'react'
import '../styles/SudokuBoard.css'
import { Cell } from './Cell'

export function SudokuBoard() {
    const [activeCell, setActiveCell] = useState<{ x: number, y: number } | null>(null)

    const isActive = (x: number, y: number) => {
        return activeCell?.x === x && activeCell?.y === y
    }
    const onCellClick = (x: number, y: number) => {
        if (isActive(x, y))
            return setActiveCell(null)

        return setActiveCell({ x, y })
    }


    let cells: JSX.Element[] = []
    for (let y = 0; y < 9; y++) {
        let row: JSX.Element[] = []

        for (let x = 0; x < 9; x++) {
            row.push(<Cell active={isActive(x, y)} onClick={() => onCellClick(x, y)} key={`${x}${y}`} ></Cell >)
        }
        cells.push(<div className='row' key={y}>{row}</div>)
    }

    return <div className='SudokuBoard'>
        {cells}
    </div>

}