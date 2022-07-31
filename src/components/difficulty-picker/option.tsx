import React from "react";
import "../../styles/difficulty-picker.css"
import { DIFFICULTY } from "./difficulty-picker";

export interface OptionProps {
    diff: DIFFICULTY;
    className: string;
    active: boolean;
}

export function Option(props: OptionProps) {
    const className = "option " + props.className;

    return <div className={className}>
        <p>{props.diff.toUpperCase()}</p>
    </div>
}

function classNameFromActive(active: boolean): string {
    return active ? 'active' : '';
}