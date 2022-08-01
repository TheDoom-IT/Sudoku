import React, { CSSProperties, useRef } from 'react';
import '../styles/keyboard.css'
import { Coordinates, KeyboardState } from './types';

export interface KeyboardProps {
    onKeyboardClick: (num: number) => void;
    position: Coordinates;
    state: KeyboardState;
}

export function Keyboard(props: KeyboardProps) {
    const keyboard = useRef<HTMLDivElement>(null);

    const calculatePosition: () => CSSProperties = () => {
        if (!keyboard.current)
            return {};

        const { height, width } = keyboard.current.getBoundingClientRect();

        let left = props.position.x;
        let top = props.position.y;

        // shift the keyboard if it overflows
        if (left + width > window.innerWidth) {
            left = left - width;
        }

        if (top + height > window.innerHeight) {
            top = top - height;
        }

        return { left, top };
    }

    const className = 'Keyboard ' + classNameFromState(props.state)

    let digits: JSX.Element[] = []
    for (let y = 0; y < 3; y++) {
        let row: JSX.Element[] = []

        for (let x = 0; x < 3; x++) {
            const digit = 3 * y + x + 1;

            row.push(<div key={`${x}${y}`} onClick={() => props.onKeyboardClick(digit)}>{digit}</div>)
        }
        digits.push(<div className='row' key={y}>{row}</div>)
    }

    return <div ref={keyboard} style={calculatePosition()} className={className}>
        {digits}
    </div>
}

function classNameFromState(state: KeyboardState): string {
    let result = '';
    switch (state) {
        case KeyboardState.HIDE:
            result = 'hide';
            break;
        case KeyboardState.SHIFT:
            result = 'shift';
            break;
        case KeyboardState.SHOW:
            result = 'show';
            break;
        default:
    }

    return result;
}