"use client";
import { useRef } from "react";
import "./FAQ.scss";
import { gsap } from "gsap";
import { faqSectionData } from "@/mokData/faqSection";
import { useGSAP } from "@gsap/react";
import Accordion from "@/components/UI/Accordion/Accordion";

const Faq = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let tl = gsap.timeline({
      autoAlpha: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=200",
        end: "bottom+=150 center-=100",
        toggleActions: "play reverse play reverse",
        // markers: true,
      },
    });

    tl.to(sectionRef.current, {
      id: "faqSection",
      duration: 0.3,
      autoAlpha: 1,
      ease: "none",
    }).to(`button`, {
      x: 0,
      stagger: 0.2,
    });
  });

  return (
    <section className="container-main-faq" ref={sectionRef}>
      <h5 className="title-main-faq">FAQ</h5>
      <ul className="wrapper-list-faq">
        <li>
          <Accordion
            title={faqSectionData[0].question}
            style={{ transform: "translate(-1000px, 0px)" }}>
            {faqSectionData[0].answer}
          </Accordion>
          <Accordion
            title={faqSectionData[1].question}
            style={{ transform: "translate(-1000px, 0px)" }}>
            {faqSectionData[1].answer}
          </Accordion>
        </li>
        <li>
          <Accordion
            title={faqSectionData[2].question}
            style={{ transform: "translate(1000px, 0px)" }}>
            {faqSectionData[2].answer}
          </Accordion>
          <Accordion
            title={faqSectionData[3].question}
            style={{ transform: "translate(1000px, 0px)" }}>
            {faqSectionData[3].answer}
          </Accordion>
        </li>
      </ul>
    </section>
  );
};

export default Faq;
