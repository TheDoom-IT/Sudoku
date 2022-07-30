import React from 'react';
import '../styles/button.css';

export interface ButtonProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

export function Button(props: ButtonProps) {
    return <button className="button" disabled={props.disabled} onClick={props.onClick}>
        {props.children}
    </button>
}