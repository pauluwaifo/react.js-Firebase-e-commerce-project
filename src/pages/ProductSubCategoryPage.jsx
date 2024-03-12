import { useContext } from "react";
import { parsePath, useParams } from "react-router-dom";
import AppContext from "../contexts/appContext";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";

function ProductSubCategoryPage() {
  const { category, subcategory } = useParams();
  const { productData, loading } = useContext(AppContext);
  const path = parsePath(category).pathname;
  const subpath = parsePath(subcategory).pathname;

  const categoryPage = productData.map((item, i) => {
    if (subpath.toLowerCase() === item.subcategory.toLowerCase()) {
      return (
        // CARD
        <section key={i}>
          <Link to={item.qty < 1 ? "" : `/product_/${item.id}`}>
            <div className="carousel-card w-12_9r" key={i}>
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
                        const allPrices = item.variants.flatMap((variant) => {
                          if (variant.sizes) {
                            return variant.sizes.map((size) => size.price);
                          } else if (variant.price) {
                            return [parseFloat(variant.price)];
                          }
                          return [];
                        });

                        const minPrice = Math.min(...allPrices);
                        const maxPrice = Math.max(...allPrices);

                        return (
                          <span>
                            {`₦${minPrice.toFixed(0)} - ₦${maxPrice.toFixed(
                              0
                            )}`}
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

                      const discountAmount = item.price - item.discountPrice;
                      const discountPercentage =
                        (discountAmount / item.price) * 100;

                      return `${Math.floor(discountPercentage)}% OFF`;
                    })()}
                  </span>
                )}
              </div>
              {/* CARD BUTTON */}
              <Link
                className={`_crd_btn ${item.qty < 1 ? "disabled" : null}`}
                to={item.qty < 1 ? "" : `/product_/${item.id}`}
              >
                {item.qty < 1 ? "SOLD OUT" : "VIEW ITEM"}
              </Link>
            </div>
          </Link>
        </section>
      );
    }
    return null;
  });

  return (
    <div className="container mt-14">
      <div className="row g-3">
        <div className="col-lg-3">
          <div className="bg-white shadow rounded-1 px-2 py-3">
            {/* LINK AND CATEGORY INFO */}
            <ul className="b-l_">
              <li>
                <Link to={"/"}>HOME</Link>
              </li>
              <li className="mx-1">&gt;</li>
              <li>
                <Link to={`/${path}`}>{path.toUpperCase()}</Link>
              </li>
              <li className="mx-1">&gt;</li>
              <li>{subpath.toUpperCase()}</li>
            </ul>
            <p>SOMETHING HERE</p>
          </div>
        </div>
        <div className="col-lg-9 col-sm-12">
          <div className="bg-white shadow rounded-1 p-3 d-flex f-wrap">
            {categoryPage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSubCategoryPage;
