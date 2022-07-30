import React from "react";
import { useNavigate } from "react-router-dom"
import { Button } from "./button";

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

    return <Button onClick={onClick}>
        {props.children}
    </Button>
}