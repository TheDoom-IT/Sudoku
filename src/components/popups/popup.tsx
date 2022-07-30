import React from 'react';
import '../../styles/popup.css';
import { Button } from '../button';
import { AiOutlineClose } from 'react-icons/ai';

export interface PopupProps {
    visible: boolean;
    hide: () => void;
    message: string;
    buttons?: { children?: React.ReactNode; action: () => void }[]
}

export function Popup(props: PopupProps) {
    const style: React.CSSProperties = {
        visibility: props.visible ? "visible" : "hidden",
        opacity: props.visible ? 1 : 0
    }

    return <div className="popup" style={style}>
        <div className='header'>
            <Button onClick={props.hide}><AiOutlineClose /></Button>
        </div>
        <div className='divider'></div>
        <div className='message'>
            {props.message}
        </div>
        <div className='divider'></div>
        <div className='buttons'>
            {props.buttons?.map((button, index) =>
                <Button key={index} onClick={button.action}>{button.children}</Button>
            )}
        </div>
    </div>
}