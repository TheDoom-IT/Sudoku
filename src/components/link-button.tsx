import React from "react";
import { useNavigate } from "react-router-dom"

export interface LinkButtonProps {
    to: string;
    className?: string;
    children?: React.ReactNode
}

export function LinkButton(props: LinkButtonProps) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(props.to);
    }

    return <button className={props.className} onClick={onClick}>
        {props.children}
    </button>
}