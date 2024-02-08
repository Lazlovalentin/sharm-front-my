"use client";
import React, {FC, useEffect, useRef} from 'react';
import "./MyModal.scss";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

interface PositionStyle {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    justifyContent?: string;
    alignItems?: string;
}

interface MyModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    positionStyle?: PositionStyle;
}

const MyModal: FC<MyModalProps> = ({children, visible, setVisible, positionStyle}) => {
    const modalRef = useRef(null);

    useGSAP(() => {
        if (visible) {
            gsap.fromTo(".container-modal", {

                opacity: 0,
            }, {
                autoAlpha: 1,
                opacity: 1,
                duration: 0.5,
            });
            gsap.to(".wrapper-content", {
                autoAlpha: 1,
                duration: 0.5,
            });


        } else {
            gsap.to('.container-modal', {
                autoAlpha: 0,
                opacity: 0,
                duration: 0.5,
            });
            gsap.to(".wrapper-content", {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
            });
        }
    }, [visible]);

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setVisible(false);
    };

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    const style = {
        display: visible ? 'flex' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: positionStyle?.justifyContent ?? 'center',
        alignItems: positionStyle?.alignItems ?? 'center',
    };

    return (
        <div className="container-modal" style={style} onClick={handleClose}>
            <div className="wrapper-content" style={{margin: 'auto', ...positionStyle}} onClick={handleContentClick}>
                <button onClick={() => setVisible(!visible)}>close</button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;
