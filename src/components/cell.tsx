import React from 'react';
import { useRef } from 'react';
import '../styles/cell.css'
import { Coordinates } from './types';

export interface CellProprs {
  cords: Coordinates;
  value: number | undefined;
  onClick: (cords: Coordinates, position: Coordinates) => void
  active: boolean;
  initial: boolean;
}

export function Cell(props: CellProprs) {
  const cell = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (cell.current === null)
      return;

    const position = cell.current.getBoundingClientRect()
    props.onClick(props.cords, { x: position.right, y: position.top })
  }

  let className = "Cell";
  className = className + (props.active ? " active" : "")
  className = className + (props.initial ? " initial" : "")

  return <div ref={cell} className={className} onClick={onClick}>
    <p>{props.value}</p>
  </div>
}