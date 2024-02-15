"use client";
import React, {FC, useRef, useState} from 'react';
import "./Accordion.scss"
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Arrow from "@/components/svg/Arrow/Arrow";

interface AccordionProps {
    style?: any
    title?: string
    children?: any
}


const Accordion: FC<AccordionProps> = ({
                                           title,
                                           style,
                                           children
                                       }) => {
    const answerRef = useRef<HTMLParagraphElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const {contextSafe} = useGSAP()

    const [open, setOpen] = useState<boolean>(false);

    const toggleHeight = contextSafe(() => {
        setOpen(!open);

        gsap.to(arrowRef.current, {
            duration: 0.5,
            rotate: !open ? '-180deg' : '0deg',
        });

        gsap.to(answerRef.current, {
            duration: 0.5,
            height: !open ? 'auto' : '0px',
            opacity: !open ? 1 : 0,
            onComplete: () => ScrollTrigger.refresh(),
        });
    })

    return (
        <button className="container-accordion" style={style} onClick={() => toggleHeight()}>
            <h6>
                {title}
                <Arrow ref={arrowRef}/>
            </h6>
            <p ref={answerRef}>
                <span>{children}</span>
            </p>
        </button>
    );
};


export default Accordion;