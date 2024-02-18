"use client"
import React, {FC, useEffect, useRef} from 'react';
import './PopularCategories.scss';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

export interface PopularCategoriesProps {
    categories: any[],
}

const PopularCategories: FC<PopularCategoriesProps> = ({categories}) => {
    const refs = useRef<(HTMLAnchorElement | null)[]>([]);
    const {contextSafe} = useGSAP();

    useGSAP(() => {
        gsap.fromTo(refs.current,
            {
                opacity: 0,
                scale: 0.5
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power1.out"
            });
    });


    const onMouseEnter = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
        const animateBorder = e.currentTarget.querySelector('.animate-border') as Element;
        const tl = gsap.timeline({repeat: -1, repeatDelay: 0.5});
        tl.to(animateBorder, {scale: 1.1, opacity: 1, duration: 0.3, ease: "power1.inOut"})
            .to(animateBorder, {scale: 1.5, opacity: 0, duration: 0.3, ease: "power1.inOut"});
    });


    const onMouseLeave = contextSafe((e: React.MouseEvent<any>) => {
        const animateBorder = e.currentTarget.querySelector('.animate-border');
        gsap.killTweensOf(animateBorder);
        gsap.to(animateBorder, {
            scale: 0.5,
            opacity: 0,
        });
    });

    return (
        <section className={"container-popular-categories"}>
            {categories.map((category, index) => (
                <div
                    key={category.id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    className="wrapper-popular-categories"
                >
                    <div className="animate-border"/>
                    <Link
                        key={category.id}
                        href={category.link}
                        className={"circle"}
                        ref={el => refs.current[index] = el}
                    >
                        <Image
                            src={category.icon}
                            alt={category.label}
                            width={85}
                            height={85}
                        />
                    </Link>
                    <span>{category.label}</span>
                </div>
            ))}
        </section>
    );
};

export default PopularCategories;
