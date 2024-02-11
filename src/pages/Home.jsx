import React from "react";
import { useContext, useState } from "react";
import AppContext from "../contexts/appContext";
import axios from "axios";
import Fuse from "fuse.js";
import Slider from "../components/Slider";
import BannerOne from "../components/BannerOne";
import BannerTwo from "../components/BannerTwo";
import CategoryCard from "../components/CategoryCard";
import PercentOff from "../components/PercentOff";
import CardCarousel from "../components/CardCarousel";
import Recommendation from "../components/Recommendation";
import "./Homepage.css"
function Home() {
  const { productData} = useContext(AppContext);
  const [searchResults, setSearchResults] = useState();
  const [search, setSearch] = useState();

  return (
    <div className="body">
      <div className="container">
        <div className="row g-3">
          {/* slider */}
          <Slider />
          {/* slider end */}
          {/* Recommendations */}
          <Recommendation />
          {/* Recommendations end*/}
          {/* product carousel 1 */}
          <CardCarousel
            cards={productData}
            category="apparel"
            heading="CAROUSEL 1"
            link="/view"
          />
          {/* product carousel 1 end */}
          {/* product carousel 2 */}
          <CardCarousel
            cards={productData}
            category="fashion"
            heading="CAROUSEL 2"
            link="/view"
          />
          {/* product carousel 2 end */}
          {/* product banner 1*/}
          <BannerOne />
          {/* product banner 1end*/}
          {/* product carousel 3 */}
          <CardCarousel
            cards={productData}
            category="drinkware"
            heading="CAROUSEL 3"
            link="/view"
          />
          {/* product carousel 3 end */}
          {/* product category select */}
          <CategoryCard />
          {/* product category select end */}
          {/* product banner 2*/}
          <BannerTwo />
          {/* product banner 2 end*/}
          {/* product carousel 4 */}
          <CardCarousel
            cards={productData}
            category="office"
            heading="CAROUSEL 4"
            link="/view"
          />
          {/* product carousel 4 end */}
          {/* product carousel 5 */}
          <CardCarousel
            cards={productData}
            category="accessories"
            heading="CAROUSEL 5"
            link="/view"
          />
          {/* Top sellers carousel */}
          <CardCarousel
            cards={productData}
            category="bags"
            heading="CAROUSEL 6"
            link="/view"
          />
          {/* Top sellers carousel end*/}
          {/* product carousel 5 end */}
          {/* 50% off banner*/}
          <PercentOff />
          {/* 50% off banner end*/}
          {/* sign up for news letter */}
          <div className="col-12">
            <div className="shadow bg-white rounded-1 p-3">
              <h5>ISellThis Nigeria. Best Online Shopping Site </h5>
              <p className="fs-p8">
                iSellThis.com is Nigeria’s leading online shopping destination.
                We take pride in offering a diverse range of products for every
                aspect of life and living at unmatched prices. Our extensive
                network with Original Equipment Manufacturers and premium
                sellers provides us with a wide array of products at highly
                competitive rates. Popular categories on our platform encompass
                electronics, mobile phones, computers, fashion, beauty products,
                home and kitchen essentials, building and construction
                materials, and much more from top-tier brands. We also feature
                additional categories such as food and drinks, automotive and
                industrial items, books, musical equipment, babies and kids'
                products, sports and fitness gear, and more. To enhance your
                shopping experience, we provide services like gift vouchers,
                consumer promotion activities spanning various categories, and
                hassle-free delivery for bulk purchases. Take advantage of free
                shipping rates for specific products, and with our bulk purchase
                option, benefit from reduced shipping rates, discounted prices,
                and flexible payment methods. Shopping on iSellThis.com is
                convenient and secure. You can make payments using your debit
                card or choose alternative payment methods. Enjoy the best
                lifestyle services online and don't miss out on our major annual
                sales events.
              </p>
            </div>
          </div>
          {/* sign up for news letter end*/}
        </div>
      </div>
    </div>
  );
}

export default Home;
