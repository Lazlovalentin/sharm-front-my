"use client";
import React, {FC, useRef} from 'react';
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
    const backgroundRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (visible) {
            gsap.fromTo(backgroundRef.current, {
                opacity: 0,
            }, {
                autoAlpha: 1,
                opacity: 1,
                duration: 0.5,
            });
            gsap.to(contentRef.current, {
                autoAlpha: 1,
                duration: 0.5,
            });

        } else {
            gsap.to(backgroundRef.current, {
                autoAlpha: 0,
                opacity: 0,
                duration: 0.5,
            });
            gsap.to(contentRef.current, {
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
        // backgroundColor: "rgba(0, 0, 0, 0.2)",
        justifyContent: positionStyle?.justifyContent ?? 'center',
        alignItems: positionStyle?.alignItems ?? 'center',
    };

    return (
        <div
            ref={backgroundRef}
            className="container-modal"
            style={{...style}}
            onClick={handleClose}
        >
            <div
                ref={contentRef}
                className="wrapper-content"
                style={{margin: 'auto', ...positionStyle}}
                onClick={handleContentClick}
            >
                <button className='modal-close' onClick={() => setVisible(!visible)}>&times;</button>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MyModal;
