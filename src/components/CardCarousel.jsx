import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/appContext";
import loadImg from "../assets/product-img-loading.jpg"


function CardCarousel({ cards, category, heading, link }) {
  const { dispatch, loading } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef(null);
  const carouselCount = 2;

  const nextCard = () => {
    setCurrentIndex(
      currentIndex == carouselCount
        ? (prevIndex) => prevIndex + 0
        : (prevIndex) => prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex(
      currentIndex == 0
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
    <div className="col-12">
      <div className="p-relative cl-b bg-white p-2 shadow rounded-1">
        {/* HEADER */}
        <div className="md-flex">
          <h6 className="al-l p-0 m-0">{heading}</h6>
          <Link className="al-r p-0 m-0 v-m" to={link}>
            View more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"20"}
              height={"20"}
              fill="white"
              className="svg-icn"
            >
              <path d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z" />
            </svg>
          </Link>
        </div>
        {/* CARD CAROUSEL */}
        <div className="carousel-container py-1 mt-2" ref={cardsContainerRef}>
          {cards
            .filter((pro) => pro.category == category)
            .slice(0, 13)
            .map((item, i) => {
              return (
                <section key={i}>
                  {item && 
                      <Link  to={`/product_/${item.id}`}>
                        <div className="carousel-card" key={i}>
                          <div className="carousel-img">
                            {item.url.length > 0 ?
                              <img
                                src={item.url ? `../${item.url[0].img}` : loadImg}
                                alt="product-img"
                                width={"100%"}
                                height={"100%"}
                              />
                              : null
                            }
                          </div>
                          <div className="carousel-text">
                            <span className="px-1 fl-b-70 al-l">{item.name}</span>
                            <span className="px-1 fl-b-30 al-r">${item.price}</span>
                            <div className="fl-b-100">
                              <ion-icon name="star"></ion-icon>
                              <ion-icon name="star"></ion-icon>
                              <ion-icon name="star"></ion-icon>
                              <ion-icon name="star"></ion-icon>
                              <ion-icon name="star-half"></ion-icon>
                            </div>
                          </div>
                        </div>
                      </Link>
                  }
                  </section>
              );
            })}
        </div>
        {/* CONTROLLERS */}
        <div className="arrow-buttons">
          {currentIndex > 0 && (
            <button
              onClick={() => {
                prevCard();
                scrollCardIntoView();
              }}
              className="arrow-button left"
            >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={"24"}
              height={"24"}
              fill="white"
            >
              <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
            </svg>
            </button>
          )}
          <button
            onClick={() => {
              nextCard();
              scrollCardIntoView();
            }}
            className="arrow-button right"
          >
            <ion-icon name="ios-arrow-forward"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
