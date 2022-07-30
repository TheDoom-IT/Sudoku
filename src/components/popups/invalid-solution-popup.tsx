import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import { Popup } from './popup';

export interface InvalidSolutionPopupProps {
    visible: boolean;
    hide: () => void;
}

export function InvalidSolutionPopup(props: InvalidSolutionPopupProps) {
    const message = "The solution is invalid.";
    const buttons = [
        {
            children: "Continue",
            action: () => { props.hide(); }
        }
    ]

    return <Popup visible={props.visible} hide={props.hide} message={message} buttons={buttons} />
}