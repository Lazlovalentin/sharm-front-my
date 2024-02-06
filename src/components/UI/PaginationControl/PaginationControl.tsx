"use client"
import React, {FC, useRef} from 'react';
import "./PaginationControl.scss";
import {useRouter, useSearchParams} from "next/navigation";
import Arrow from "@/components/svg/Arrow/Arrow";
import {gsap} from 'gsap';
import {useGSAP} from "@gsap/react";

interface PaginationControlProps {
    totalPages: number;
}

const PaginationControl: FC<PaginationControlProps> = ({totalPages}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {contextSafe} = useGSAP();

    const page = parseInt(searchParams.get('page') ?? '1');

    const buttonRefs = useRef(null);

    const handleMouseEnter = contextSafe((element: HTMLElement) => {
        const fill = element.querySelector('.color-fill');
        gsap.fromTo(fill, {scale: 0, transformOrigin: "center"},
            {scale: 1, duration: 0.5, ease: "power1.out"});
    });

    const handleMouseLeave = contextSafe((element: HTMLElement) => {
        const fill = element.querySelector('.color-fill');
        gsap.to(fill, {transform: 'scale(0)', duration: 0.5, ease: "power1.in"});
    });

    const goToPage = (event: any, newPage: number) => {
        const button = event.currentTarget;
        gsap.to(button, {
            scale: 2.5, duration: 0.2, ease: "power1.out",
            onComplete: () => {
                gsap.to(button, {scale: 1, duration: 0.1});
                router.push(`?page=${newPage}`);
            }
        });
    };

    const renderPaginationButtons = () => {
        let buttons = [];

        buttons.push(
            <button
                ref={buttonRefs}
                disabled={page === 1}
                className={page === 1 ? 'button-active-pagination' : ''}
                onClick={(event) => goToPage(event, 1)}
                onMouseEnter={({currentTarget}) => handleMouseEnter(currentTarget)}
                onMouseLeave={({currentTarget}) => handleMouseLeave(currentTarget)}
            >
                {1}
                <div className="color-fill"></div>
            </button>
        );

        let left = Math.max(2, page - 2);
        let right = Math.min(page + 2, totalPages - 1);

        if (totalPages > 5) {
            if (page > 4) {
                buttons.push(<span key="left-ellipsis" className="left-ellipsis">...</span>);
                if (totalPages - page > 3) {
                    right = page + 2;
                } else {
                    left = totalPages - 4;
                }
            }

            if (page < totalPages - 3) {
                if (page < 4) {
                    right = 5;
                }
            }
        }

        for (let i = left; i <= right; i++) {
            buttons.push(
                <button
                    ref={buttonRefs}
                    key={i}
                    disabled={i === page}
                    className={i === page ? 'button-active-pagination' : ''}
                    onClick={(event) => goToPage(event, i)}
                    onMouseEnter={({currentTarget}) => handleMouseEnter(currentTarget)}
                    onMouseLeave={({currentTarget}) => handleMouseLeave(currentTarget)}

                >
                    {i}
                    <div className="color-fill"></div>
                </button>
            );
        }

        if (right < totalPages - 1) {
            buttons.push(<span key="right-ellipsis" className={"right-ellipsis"}>...</span>);
        }

        buttons.push(
            <button
                ref={buttonRefs}
                key={totalPages}
                disabled={page === totalPages}
                className={page === totalPages ? 'button-active-pagination' : ''}
                onClick={(e) => goToPage(e, totalPages)}
                onMouseEnter={({currentTarget}) => handleMouseEnter(currentTarget)}
                onMouseLeave={({currentTarget}) => handleMouseLeave(currentTarget)}
            >
                {totalPages}
                <div className="color-fill"></div>
            </button>
        );

        return buttons;
    };

    return (
        <div className="container-pagination-control">
            <button
                className={page === 1 ? "arrow-left-pagination button-disabled-pagination" : "arrow-left-pagination "}
                disabled={page === 1}
                onClick={(event) => goToPage(event, page - 1)}>
                <Arrow/>
            </button>
            {renderPaginationButtons()}
            <button
                className={page === totalPages ? "arrow-right-pagination button-disabled-pagination" : "arrow-pagination arrow-right-pagination active"}
                disabled={page === totalPages}
                onClick={(event) => goToPage(event, page + 1)}>
                <Arrow/>
            </button>
        </div>
    );
};

export default PaginationControl;
