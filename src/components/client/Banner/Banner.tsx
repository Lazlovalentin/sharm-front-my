"use client";
import React, {FC, useEffect, useRef, useState} from "react";
import "./banner.scss";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import Draggable from "gsap/Draggable";
import MyBtn from "@/components/UI/MyBtn/MyBtn";
import {BannerItem} from "@/mokData/bannerData";
import {Arrow} from "@/components/general/svg/Arrow";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(Draggable);

type BannerData = BannerItem[];

interface BannerProps {
    data: BannerData;
}

const Banner: FC<BannerProps> = ({data}) => {
    let imageList = useRef<HTMLUListElement | null>(null);
    let dotsContainer = useRef<HTMLDivElement | null>(null);

    const [offset, setOffset] = useState<number>(0);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const autoPlay = () => {
            if (autoPlayEnabled) {
                setOffset((prevOffset) => (prevOffset + 1) % data.length);
            }
        };

        timeoutId = setTimeout(autoPlay, 2500);

        return () => {
            clearTimeout(timeoutId);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, autoPlayEnabled]);

    const handleMouseEnter = () => {
        setAutoPlayEnabled(false);
    };

    const handleMouseLeave = () => {
        setAutoPlayEnabled(true);
    };

    useGSAP(() => {
        const shift = imageList.current?.getBoundingClientRect().width || 0;

        Array.from(imageList.current?.children || []).forEach((image, _) => {
            gsap.to(image as HTMLElement, {
                x: -(shift * offset),
                ease: Power3.easeOut,
                duration: 1,
            });
        });
    }, {dependencies: [offset]});

    const handleArrowClick = (direction: "next" | "prev") => {
        setAutoPlayEnabled(false);
        setOffset((prevOffset) => {
            return (
                (prevOffset + (direction === "next" ? 1 : -1) + data.length) %
                data.length
            );
        });
    };
    const handleDotClick = (index: number) => {
        setAutoPlayEnabled(false);
        setOffset(index);
    };

    useGSAP(() => {
        let startX = 0;
        const draggableInstance = Draggable.create(imageList.current, {
            type: "x",
            bounds: ".banner-gallery",
            edgeResistance: 0.65,
            throwProps: true,
            onDragStart: function (e) {
                startX = e.clientX || e.touches[0].clientX;
            },
            onDragEnd: function (e) {
                const dragDistance =
                    e.clientX - startX || e.touches[0].clientX - startX;
                if (dragDistance > 50) {
                    handleArrowClick("prev");
                } else if (dragDistance < -50) {
                    handleArrowClick("next");
                }
            },
        });
    });

    useGSAP(() => {
        gsap.to(".banner-cover .banner-left", {
            y: "-100%",
            ease: Power3.easeOut,
            duration: 1,
            delay: 0.5,
        });

        gsap.to(".banner-cover .banner-right", {
            x: "100%",
            ease: Power3.easeOut,
            duration: 1,
            delay: 0.7,
        });

        gsap.to(".banner-cover", {
            display: "none",
            duration: 1,
            delay: 0.7,
        });
    })

    useGSAP(() => {

        gsap.fromTo(
            ".banner-button",
            {
                y: "-100%",
                ease: Power3.easeOut,
                duration: 1,
                delay: 0.3,
            },
            {
                y: "0",
                ease: Power3.easeOut,
                duration: 1,
                delay: 0.3,
            }
        );
    }, {dependencies: [offset]});

    return (
        <div className="container-banner" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="banner-gallery">
                <div className="banner-image">
                    <ul ref={imageList}>
                        {data.map((item) => (
                            <li key={item.id}>
                                <Link href={item.link}>
                                    <div className="wrapper-img-banner">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill={true}
                                        />
                                    </div>
                                    {
                                        item.bottom &&
                                        <div className="banner-button"
                                             style={{
                                                 top: `${item.top}%`,
                                                 left: `${item.left}%`,
                                             }}>
                                            <MyBtn
                                                text={item.bottom}
                                                color="primary"
                                            />
                                        </div>
                                    }
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="banner-controls-prev"
                        type="button"
                        name="arrow-control"
                        title="arrow-control"
                        onClick={() => handleArrowClick("prev")}>
                        <Arrow className="banner-controls-prevArrow"/>
                    </button>
                    <button
                        className="banner-controls-next"
                        type="button"
                        name="arrow-control"
                        title="arrow-control"
                        onClick={() => handleArrowClick("next")}>
                        <Arrow className="banner-controls-nextArrow"/>
                    </button>
                </div>
                <div className="banner-cover">
                    <div className="banner-left"></div>
                    <div className="banner-right"></div>
                </div>
                <div className="banner-dots" ref={dotsContainer}>
                    {data.map((item, index) => (
                        <div key={item.id}
                             className={`banner-dot ${index === offset ? "active" : ""}`}
                             onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
