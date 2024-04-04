import { Star } from "@/components/svg/Star";
import { StarOutline } from "@/components/svg/Star-outline";
import React from "react";
import "./RatingStars.scss";

const StarRating = ({ rating }: { rating: number }) => {
  const widthPercentage = rating * 20 + "%";

  return (
    <div className="star-rating">
      <div className="back-stars">
        {[...Array(5)].map((_, index) => (
          <StarOutline key={index} />
        ))}
        <div className="front-stars-wrapper" style={{ width: widthPercentage }}>
          <div className="front-stars">
            {[...Array(5)].map((_, index) => (
              <Star key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarRating;
