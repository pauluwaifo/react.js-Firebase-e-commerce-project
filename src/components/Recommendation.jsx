import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import rcd_1 from "../assets/recomended_images/rcd_1.png";
import rcd_2 from "../assets/recomended_images/rcd_2.png";
import rcd_3 from "../assets/recomended_images/rcd_3.png";
import rcd_4 from "../assets/recomended_images/rcd_4.png";
import rcd_5 from "../assets/recomended_images/rcd_5.png";
import rcd_6 from "../assets/recomended_images/rcd_6.png";
import rcd_7 from "../assets/recomended_images/rcd_7.png";

function Recommendation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef(null);
  const carouselCount = 1;

  const nextCard = () => {
    setCurrentIndex(
      currentIndex == carouselCount
        ? (prevIndex) => prevIndex + 0
        : (prevIndex) => prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex(
      currentIndex <= 0
        ? (prevIndex) => prevIndex - 0
        : (prevIndex) => prevIndex - 1
    );
  };

  useEffect(() => {
    scrollCardIntoView();
  }, [currentIndex]);

  const scrollCardIntoView = () => {
    if (cardsContainerRef.current) {
      const cardWidth = cardsContainerRef.current.offsetWidth;
      const newScrollPosition = currentIndex * cardWidth;
      cardsContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="col-lg-12 mt-m5">
      <div className="rc-d-container">
        <div className="rc-d-wrapper" ref={cardsContainerRef}>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_1} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Deodorants</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_2} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Groceries</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_3} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Women Shoes</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_4} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Sneakers</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_5} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Jewelry</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_6} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Hand Bags</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          <Link to="#">
            <div className="rc-d-card">
              <img className="d-inline-block" src={rcd_7} alt="...." />
              <div className="d-inline-block lh">
                <h6 className="m-0 p-0">Beauty</h6>
                <p className="m-0 p-0">Big Sale Up To 20%</p>
              </div>
            </div>
          </Link>
          
        </div>
        <div className="rc-d-controls">
          {currentIndex > 0 && (
            <button
              className="rc-d-prev-btn"
              onClick={() => {
                prevCard();
                scrollCardIntoView();
              }}
            >
              <span className="rc-d-arrow rc-d-left"></span>
            </button>
          )}
          {currentIndex !== carouselCount && 
            <button
              className="rc-d-next-btn"
              onClick={() => {
                nextCard();
                scrollCardIntoView();
              }}
            >
              <span className="rc-d-arrow rc-d-right"></span>
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
