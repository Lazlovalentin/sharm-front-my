"use client";
import StarRating from "@/components/general/RaitingStars/RatingStars";
import "./Testimonials.scss";
import React, { FC, useEffect, useRef, useState } from "react";
import { TestimonialsItem } from "@/mokData/testimonialsData";
import { ArrowLong } from "@/components/svg/Arrow/Arrow-long";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import Draggable from "gsap/Draggable";
import Link from "next/link";
import { useWindowSize } from "@uidotdev/usehooks";

type TestimonialsData = TestimonialsItem[];

interface TestimonialsProps {
  data: TestimonialsData;
}

const Testimonials: FC<TestimonialsProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const size = useWindowSize();
  useEffect(() => {
    setIsMobile(size.width !== null && size.width <= 1172);
  }, [size.width]);
  let itemsList = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = isMobile ? 2 : 3;
  const [startReached, setStartReached] = useState<boolean>(true);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useGSAP(() => {
    if (itemsList.current) {
      gsap.fromTo(
        ".testimonials-item",
        {
          autoAlpha: 0,
          y: 70,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: itemsList.current,
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }
  }, [data, currentPage]);

  useEffect(() => {
    setStartReached(currentPage === 1);
  }, [currentPage]);
  useEffect(() => {
    setEndReached(currentPage === totalPages);
  }, [currentPage, totalPages]);

  const handleArrowClick = (direction: "next" | "prev") => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && prevPage < totalPages) {
        return prevPage + 1;
      } else if (direction === "prev" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  useGSAP(() => {
    let startX = 0;
    let startY = 0;
    Draggable.create(itemsList.current, {
      type: isMobile ? "y" : "x",
      bounds: { minX: 10, maxX: 10, minY: 10, maxY: 10 },
      edgeResistance: 0.65,
      throwProps: true,
      onDragStart: function (e) {
        if (isMobile) {
          startY = e.clientY || e.touches[0].clientY;
        } else {
          startX = e.clientX || e.touches[0].clientX;
        }
      },

      onDragEnd: function (e) {
        if (isMobile) {
          const dragDistance = e.touches
            ? e.touches[0].clientY - startY
            : e.clientY - startY;
          if (dragDistance > 20) {
            handleArrowClick("prev");
          } else if (dragDistance < -20) {
            handleArrowClick("next");
          }
        } else {
          const dragDistance = e.touches
            ? e.touches[0].clientX - startX
            : e.clientX - startX;
          if (dragDistance > 50) {
            handleArrowClick("prev");
          } else if (dragDistance < -50) {
            handleArrowClick("next");
          }
        }
      },
    });
  });
  return (
    <section className="container-testimonials" ref={sectionRef}>
      <h5 className="title-testimonials">Відгуки наших покупців</h5>
      <ul className="main-testimonials-wrapper" ref={itemsList}>
        {data
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item) => (
            <li key={item.id}>
              <div className="testimonials-item">
                {isMobile ? (
                  <>
                    <div className="item-top-part">
                      <div className="item-name">
                        <span className="item-name">
                          {item.name.toUpperCase()}, {item.date}
                        </span>
                        <StarRating rating={item.rating} />
                      </div>
                      <Link href={item.linkToProduct}>
                        <div className="item-bottom-part">
                          <div className="product-img">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={50}
                              height={50}
                            />
                          </div>
                          <div className="product-info">
                            <span className="product-title">
                              {item.title.toUpperCase()}
                            </span>
                            <span className="product-category">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <Link href={item.linkToTestimonial}>
                      <span className="item-text">{item.testimonial}</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="item-top-part">
                      <div className="item-name">
                        <span className="item-name">
                          {item.name.toUpperCase()}, {item.date}
                        </span>
                        <StarRating rating={item.rating} />
                      </div>
                      <Link href={item.linkToTestimonial}>
                        <span className="item-text">{item.testimonial}</span>
                      </Link>
                    </div>
                    <Link href={item.linkToProduct}>
                      <div className="item-bottom-part">
                        <div className="product-img">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="product-info">
                          <span className="product-title">
                            {item.title.toUpperCase()}
                          </span>
                          <span className="product-category">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </li>
          ))}
      </ul>
      <div className="arrow-block">
        <button
          className="arrow-back-button"
          type="button"
          name="arrow-control"
          title="arrow-control"
          disabled={startReached}
          onClick={() => handleArrowClick("prev")}>
          <ArrowLong className="arrow-back" isMobile={isMobile} />{" "}
        </button>
        <button
          className="arrow-forward-button"
          type="button"
          name="arrow-control"
          title="arrow-control"
          disabled={endReached}
          onClick={() => handleArrowClick("next")}>
          <ArrowLong className="arrow-forward" isMobile={isMobile} />{" "}
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
