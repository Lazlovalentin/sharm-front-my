import {FC, useRef, useState} from 'react';
import "./FAQCard.scss";
import Arrow from "@/components/svg/Arrow/Arrow";
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from "@gsap/react";

interface FAQCardProps {
    data: any;
    style: any
}

const FAQCard: FC<FAQCardProps> = ({
                                       data,
                                       style,
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
        <button className="container-faq-card" style={style} onClick={() => toggleHeight()}>
            <h6>
                {data.question}
                <Arrow ref={arrowRef}/>
            </h6>
            <p ref={answerRef}>
                <span>{data.answer}</span>
            </p>
        </button>
    );
};

export {FAQCard};
