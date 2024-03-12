import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/appContext";
import loadImg from "../assets/product-img-loading.jpg";
import StarRating from "../components/StarRating";
import CountDownTimer from "./CountDownTimer";

function CardCarousel({
  cards,
  category,
  heading,
  bg,
  border,
  color,
  wishlist,
}) {
  const { dispatch, loading } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef(null);
  const [carouselCount, setCarouselCount] = useState(0);
  const nextCard = () => {
    setCurrentIndex(
      currentIndex >= carouselCount
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
      setCarouselCount(
        Math.floor(Number(cardsContainerRef.current.childElementCount) / 1 / 6)
      );
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
      <div
        className={`p-relative cl-b p-2 shadow`}
        style={{
          border: border,
          background: heading.toLowerCase().includes("launch day")
            ? `white`
            : `none`,
        }}
      >
        {/* HEADER */}
        <div
          className={`c-header w-100 py-1 px-2 ${
            heading.toLowerCase().includes("launch") ? "al-c py-3" : "md-flex"
          } ${wishlist && cards.length < 13 ? `py-2p5` : null}`}
          style={{ background: bg }}
        >
          {/* HEADING */}
          <h5 style={{ color: color }} className="p-0 m-0 fw-bold">
            {heading}
          </h5>
          {/* LINK VIEW MORE */}
          {heading.toLowerCase().includes("launch day") ? null : (
            <>
              {wishlist && cards.length > 13 ? (
                <Link
                  style={{ color: color }}
                  className="al-r p-0 m-0 v-m"
                  to={`/${category}`}
                >
                  <span>View more</span>
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
              ) : null}
              {wishlist ? null : (
                <Link
                  style={{ color: color }}
                  className="al-r p-0 m-0 v-m"
                  to={`/${category}`}
                >
                  <span>View more</span>
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
              )}
            </>
          )}
        </div>
        {/* CARD CAROUSEL */}
        <div
          style={{
            background: heading.toLowerCase().includes("launch day")
              ? `white`
              : `none`,
          }}
          className={`carousel-container py-1 mt-5`}
          ref={cardsContainerRef}
        >
          {cards
            .filter((pro) =>
              pro.category == category
                ? pro.category == category
                : category == null && pro.discountPrice
                ? pro
                : wishlist
                ? pro
                : null
            )
            .slice(0, 13)
            .map((item, i) => {
              return (
                <section key={i}>
                  {item && (
                    <Link to={`/product_/${item.id}`}>
                      <div className="carousel-card" key={i}>
                        {/* CARD IMAGE */}
                        <div className="carousel-img">
                          {item.url.length > 0 ? (
                            <img
                              src={
                                !loading && item.url[0].img
                                  ? `../${item.url[0].img}`
                                  : loadImg
                              }
                              alt="product-img"
                              width={"100%"}
                              height={"100%"}
                            />
                          ) : null}
                        </div>
                        {/* CARD TEXT */}
                        <div className="carousel-text">
                          <StarRating />
                          {/* ITEM NAME */}
                          <span className="fl-b-100 al-l">{item.name}</span>
                          {/* DISCOUNT PRICE */}
                          <span className="d-block fs-1 al-l fs-1 fw-bold rounded-2 mt-1">
                            {item.discountPrice && `₦${item.discountPrice}`}
                          </span>

                          {/* ITEM PRICE */}
                          <span
                            className={`al-l fw-bold rounded-2 ${
                              item.discountPrice ? `_dcp` : `fs-1`
                            }`}
                          >
                            {item.variants && item.variants.length > 0 ? (
                              <>
                                {(() => {
                                  const allPrices = item.variants.flatMap(
                                    (variant) => {
                                      if (variant.sizes) {
                                        return variant.sizes.map(
                                          (size) => size.price
                                        );
                                      } else if (variant.price) {
                                        return [parseFloat(variant.price)];
                                      }
                                      return [];
                                    }
                                  );

                                  const minPrice = Math.min(...allPrices);
                                  const maxPrice = Math.max(...allPrices);

                                  return (
                                    <span>
                                      {`₦${minPrice.toFixed(
                                        0
                                      )} - ₦${maxPrice.toFixed(0)}`}
                                    </span>
                                  );
                                })()}
                              </>
                            ) : (
                              `₦${item.price}`
                            )}
                          </span>

                          {/* DISCOUNT PERCENTAGE CALCULATOR */}
                          {item.discountPrice && (
                            <span className="bg-primary d-inline-block p-absolute top-0 right-0 m-1 text-white p-1">
                              {(() => {
                                if (
                                  item.price <= 0 ||
                                  item.discountPrice <= 0 ||
                                  item.discountPrice >= item.Price
                                ) {
                                  console.error("Invalid input values");
                                  return null;
                                }

                                const discountAmount =
                                  item.price - item.discountPrice;
                                const discountPercentage =
                                  (discountAmount / item.price) * 100;

                                return `${Math.floor(discountPercentage)}% OFF`;
                              })()}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )}
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
          {cards && cards.length > 6 ? (
            <button
              onClick={() => {
                nextCard();
                scrollCardIntoView();
              }}
              className="arrow-button right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={"24"}
                height={"24"}
                fill="white"
                viewBox="0 0 512 512"
              >
                <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CardCarousel;
