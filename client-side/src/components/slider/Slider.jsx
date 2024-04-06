import React, { useState } from "react";
import "./Slider.scss";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlides = (direction) => {
    if (direction === "left") {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img
              src="/arrow.png"
              alt="left_arrow"
              onClick={() => changeSlides("left")}
            />
          </div>

          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" />
          </div>

          <div className="arrow">
            <img
              src="/arrow.png"
              alt="right_arrow"
              className="right"
              onClick={() => changeSlides("right")}
            />
          </div>

          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className="mainImage">
        <img
          src={images[0]}
          alt="primary_image"
          onClick={() => setImageIndex(0)}
        />
      </div>

      <div className="secondaryImage">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
