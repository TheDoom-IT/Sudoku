import React from 'react';
import { useRef } from 'react';
import '../styles/Cell.css'
import { Coordinates } from './types';

export interface CellProprs {
  cords: Coordinates;
  onClick: (cords: Coordinates, position: Coordinates) => void
  active: boolean
}

export function Cell(props: CellProprs) {
  const cell = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (cell.current === null)
      return;

    const position = cell.current.getBoundingClientRect()
    props.onClick(props.cords, { x: position.right, y: position.top })
  }


  return <div ref={cell} className={"Cell " + (props.active ? "active" : "")} onClick={onClick}></div >
}