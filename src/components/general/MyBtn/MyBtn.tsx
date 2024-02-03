import React, {FC, useRef} from 'react';
import "./MyBtn.scss"
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

interface MyBtnProps {
    type: string;
    text: string;
}

const MyBtn: FC<MyBtnProps> = ({text}) => {
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
            className={"container-my-btn"}
            ref={ref}
            onMouseEnter={handleMouseEnter}
        >
            {text}
        </button>
    );
};

export default MyBtn;