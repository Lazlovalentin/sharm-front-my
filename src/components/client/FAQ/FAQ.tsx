'use client';
import {useRef} from 'react';
import "./FAQ.scss"
import {FAQCard} from './FAQCard/FAQCard';
import {gsap} from 'gsap';
import {faqSectionData} from "@/mokData/faqSection";
import {useGSAP} from "@gsap/react";

const Faq = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let tl = gsap.timeline({
            autoAlpha: 0,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top center+=200',
                end: 'bottom+=150 center-=100',
                toggleActions: 'play reverse play reverse',
                // markers: true,
            },
        });

        tl.to(sectionRef.current, {
            id: 'faqSection',
            duration: 0.3,
            autoAlpha: 1,
            ease: 'none',
        }).to(`button`, {
            x: 0,
            stagger: 0.2,
        });

    });

    return (
        <section className="container-main-faq" ref={sectionRef}>
            <h5 className="title-main-faq">FAQ</h5>
            <ul className='wrapper-list-faq'>
                <li>
                    <FAQCard data={faqSectionData[0]} style={{transform: 'translate(-1000px, 0px)'}}/>
                    <FAQCard data={faqSectionData[1]} style={{transform: 'translate(-1000px, 0px)'}}/>
                </li>
                <li>
                    <FAQCard data={faqSectionData[2]} style={{transform: 'translate(1000px, 0px)'}}/>
                    <FAQCard data={faqSectionData[3]} style={{transform: 'translate(1000px, 0px)'}}/>
                </li>
            </ul>
        </section>
    );
};

export default Faq;
