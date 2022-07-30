import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import { Popup } from './popup';

export interface WonGamePopupProps {
    visible: boolean;
    hide: () => void;
}

export function WonGamePopup(props: WonGamePopupProps) {
    const navigate = useNavigate();

    const message = "You won! What do you want to do now?";
    const buttons = [
        {
            children: "Home",
            action: () => { navigate(ROUTES.HOME); }
        },
        {
            children: "Play again",
            action: () => { location.reload(); }
        }
    ]

    return <Popup visible={props.visible} hide={props.hide} message={message} buttons={buttons} />
}