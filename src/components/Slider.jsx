import React, { useState, useEffect } from "react";

function Slider() {
  const images = [
    "banner_images/slide_1.jpg",
    "banner_images/slide_2.jpg",
    "banner_images/slide_5.png",
    "banner_images/slide_6.png",


  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 3000); // Change the interval as needed (in milliseconds)
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  return (
    <div className="col-12 mt-11">
      <div
        className="image-slider shadow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Slide ${index + 1}`}
            width={"100%"}
            className={`i-m-s rounded-1 ${
              index === currentImage ? "visible" : "hidden"
            }`}
          />
        ))}

        <div className="controls">
          <button onClick={handlePrev}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"24"}
              height={"24"}
            >
              <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
            </svg>
          </button>
          <button onClick={handleNext}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"24"}
              height={"24"}
            >
              <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
