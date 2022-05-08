import React from "react";
import "./rate.scss";

const Rate = ({ rate = 0, count = 0 }) => {
    
  const arr = [1, 2, 3, 4, 5];
  const rating = Math.round(rate / 2)

  const ratedIndexes = arr.slice(0, rating);
  const nonRatedIndexes = arr.slice(rating, 5);

  return (
    <div className="rate-section">
      <div className="film-rate">
        {ratedIndexes.map((item, index) => {
          return <div key={index} className={`film-rate-point solid`}></div>;
        })}
        {nonRatedIndexes.map((item, index) => {
          return <div key={index} className={`film-rate-point`}></div>;
        })}
      </div>
      <p className="rate-count">({count})</p>
    </div>
  );
};

export default Rate;
