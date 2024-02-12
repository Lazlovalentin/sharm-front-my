"use client"
import React, { useRef} from 'react';
import {useTheme} from "next-themes";
import {useGSAP} from "@gsap/react";
import {gsap} from 'gsap';

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme()
    const svgRef = useRef(null);
    const {contextSafe} = useGSAP();

    const changeTheme = contextSafe(() => {
        setTheme(theme === "dark" ? "light" : "dark")
        gsap.to(svgRef.current, {
            rotate: 360,
            opacity: 1,
            duration: 0.5,
            ease: 'power1.inOut',
        });
        gsap.set(svgRef.current, {clearProps: "all"});
    })

    const handleMouseEnter = contextSafe(() => {
        gsap.fromTo(svgRef.current,
            {scale: 1},
            {
                scale: 0.6,
                duration: 0.3,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: 1
            }
        );
    });


    return (
        <div
            className="container-theme-change"
            onClick={changeTheme}
        >
            <div ref={svgRef}
                 onMouseEnter={handleMouseEnter}
            >
                {theme === 'light' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Property 1=Moon">
                            <path id="Vector"
                                  d="M21.0672 11.8568L20.6393 11.5983L21.0672 11.8568ZM12.1432 2.93276L11.8846 2.50482V2.50482L12.1432 2.93276ZM7.25036 20.2294C7.01133 20.0911 6.70547 20.1728 6.5672 20.4118C6.42893 20.6508 6.51061 20.9567 6.74964 21.095L7.25036 20.2294ZM2.90502 17.2504C3.04329 17.4894 3.34915 17.5711 3.58818 17.4328C3.82722 17.2945 3.9089 16.9887 3.77062 16.7496L2.90502 17.2504ZM21.5 12C21.5 17.2467 17.2467 21.5 12 21.5V22.5C17.799 22.5 22.5 17.799 22.5 12H21.5ZM2.5 12C2.5 6.75329 6.75329 2.5 12 2.5V1.5C6.20101 1.5 1.5 6.20101 1.5 12H2.5ZM15.5 14.5C12.1863 14.5 9.5 11.8137 9.5 8.5H8.5C8.5 12.366 11.634 15.5 15.5 15.5V14.5ZM20.6393 11.5983C19.5878 13.3384 17.6793 14.5 15.5 14.5V15.5C18.0438 15.5 20.2701 14.1428 21.4952 12.1154L20.6393 11.5983ZM9.5 8.5C9.5 6.3207 10.6616 4.41222 12.4017 3.3607L11.8846 2.50482C9.85719 3.72988 8.5 5.95621 8.5 8.5H9.5ZM12 2.5C11.9942 2.5 11.979 2.49865 11.9592 2.49025C11.9397 2.48192 11.9238 2.47011 11.9127 2.45849C11.8922 2.43713 11.8958 2.42663 11.8981 2.44357C11.9002 2.4593 11.8978 2.4785 11.8917 2.49304C11.8891 2.4993 11.8866 2.50259 11.8857 2.50378C11.8849 2.50468 11.8847 2.50471 11.8846 2.50482L12.4017 3.3607C12.8032 3.11814 12.9377 2.66929 12.8891 2.30973C12.839 1.93863 12.5549 1.5 12 1.5V2.5ZM21.4952 12.1154C21.4953 12.1153 21.4953 12.1151 21.4962 12.1143C21.4974 12.1134 21.5007 12.1109 21.507 12.1083C21.5215 12.1022 21.5407 12.0998 21.5564 12.1019C21.5734 12.1042 21.5629 12.1078 21.5415 12.0873C21.5299 12.0762 21.5181 12.0603 21.5098 12.0408C21.5013 12.021 21.5 12.0058 21.5 12H22.5C22.5 11.4451 22.0614 11.161 21.6903 11.1109C21.3307 11.0623 20.8819 11.1968 20.6393 11.5983L21.4952 12.1154ZM12 21.5C10.2688 21.5 8.64718 21.0374 7.25036 20.2294L6.74964 21.095C8.29456 21.9887 10.0883 22.5 12 22.5V21.5ZM3.77062 16.7496C2.96261 15.3528 2.5 13.7312 2.5 12H1.5C1.5 13.9117 2.01133 15.7054 2.90502 17.2504L3.77062 16.7496Z"
                                  fill="black"/>
                        </g>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Property 1=Sun">
                            <path id="Ellipse 363"
                                  d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451"
                                  stroke="white" strokeLinecap="round"/>
                            <path id="Vector" d="M12 2V4" stroke="white" strokeLinecap="round"/>
                            <path id="Vector_2" d="M12 20V22" stroke="white" strokeLinecap="round"/>
                            <path id="Vector_3" d="M4 12L2 12" stroke="white" strokeLinecap="round"/>
                            <path id="Vector_4" d="M22 12L20 12" stroke="white" strokeLinecap="round"/>
                            <path id="Vector_5" d="M19.7778 4.22217L17.5558 6.25375" stroke="white"
                                  strokeLinecap="round"/>
                            <path id="Vector_6" d="M4.22217 4.22217L6.44418 6.25375" stroke="white"
                                  strokeLinecap="round"/>
                            <path id="Vector_7" d="M6.44434 17.5557L4.22211 19.7779" stroke="white"
                                  strokeLinecap="round"/>
                            <path id="Vector_8" d="M19.7778 19.7778L17.5558 17.5555" stroke="white"
                                  strokeLinecap="round"/>
                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
};
export default ThemeSwitcher;