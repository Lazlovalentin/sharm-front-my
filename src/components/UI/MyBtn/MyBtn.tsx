"use client"
import React, {FC, useRef} from 'react';
import "./MyBtn.scss"
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

interface MyBtnProps {
    text: string;
    color: "primary" | "attention" | "success"
    click?: any
}

const MyBtn: FC<MyBtnProps> = ({text, color, click}) => {
    const ref = useRef(null);
    const {contextSafe} = useGSAP();

    const handleMouseEnter = contextSafe(() => {
        gsap.fromTo(ref.current,
            {scale: 1,},
            {scale: 0.9, duration: 0.3, ease: 'power1.inOut', yoyo: true, repeat: 1}
        );
    });

    return (
        <button
            type="submit"
            className={`container-my-btn my-btn-${color}`}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onClick={click}
        >
            {text}
        </button>
    );
};

export default MyBtn;