import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../contexts/appContext";
import { Link } from "react-router-dom";
import SimCardCarousel from "../components/SimCardCarousel";

function ProductDetailPage() {
  const { id } = useParams();
  const { productData } = useContext(AppContext);
  const [img_sld, setImg_sld] = useState(0);
  const [count, setCount] = useState(Number(1));
  const [sizeCount, setSizeCount] = useState(0);
  const [colorCount, setColorCount] = useState(0);
  const [description, setDescription] = useState("");
  const [idC, setIdC] = useState(1);

  const handleCount = (e) => {
    setCount(e.target.value);
  };
  useEffect(() => {
    productData.map((product) => {
      {
        product.id === id && setDescription(product.description);
      }
    });
  }, [productData]);


  

  const productDetail = productData.map((product, i) => {
    if (product.id === id) {
      return (
        <div className="row g-3" key={i}>
          {/* PRODUCT INFORMATION, ADD TO CART AND QTY */}
          <div className="col-12 mt-11 bg-white shadow rounded-1 px-5 py-2 h-7">
            <div className="row g-3">
              {/* TOP LINKS  */}
              <div className="col-sm-12 col-lg-12 mt-4">
                <div>
                  <ul className="b-l_">
                    <li>
                      <Link to={"/home"}>HOME</Link>
                    </li>
                    <li className="mx-1">&gt;</li>
                    <li>
                      <Link to={`/category/${product.category}`}>
                        {product.category.toUpperCase()}
                      </Link>
                    </li>
                    <li className="mx-1">&gt;</li>
                    <li>
                      <Link to={`/category/${product.subcategory}`}>
                        {product.subcategory.toUpperCase()}
                      </Link>
                    </li>
                    <li className="mx-1">&gt;</li>
                    <li>{product.name.toUpperCase()}</li>
                  </ul>
                </div>
              </div>
              {/* PRODUCT IMAGE CHOICE TO DISPLAY*/}
              <div className="col-sm-12 col-lg-1">
                <div>
                  {product.url.map((images, i) => {
                    return (
                      <div
                        key={i}
                        className={`img_sld_ch ${img_sld === i && `active`}`}
                      >
                        <label
                          htmlFor={`img_sld_${i}`}
                          onClick={() => setImg_sld(i)}
                        >
                          <img
                            src={`../${images.img}`}
                            alt={product.name}
                            width={"100%"}
                            height={"100%"}
                            key={i}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* PRODUCT IMAGE ON DISPLAY, LINKS TO SHARE*/}
              <div className="col-sm-12 col-lg-5">
                {/* IMAGE ON DISPLAY */}
                <div className="img_sld">
                  <img
                    src={`../${product.url[img_sld].img}`}
                    alt={product.name}
                    width={"100%"}
                    height={"100%"}
                    className="img_sld border rounded-1"
                  />
                </div>
                {/* horizontal divider */}
                <div className="horizontal-divider mt-3"></div>
                <div className="mt-2">
                  <h6>SHARE THIS PRODUCT</h6>
                  <label id="social links">
                    <Link to={"/home"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"25"}
                      >
                        <path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z" />
                      </svg>
                    </Link>
                    <Link to={"/home"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"25"}
                      >
                        <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
                      </svg>
                    </Link>
                    <Link to={"/home"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={"25"}
                      >
                        <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z" />
                        <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z" />
                      </svg>
                    </Link>
                  </label>
                </div>
              </div>
              {/* PRODUCT NAME, CATEGORY, RATING, PRICE, COLOR, SIZE, ADD TO CART */}
              <div className=" col-sm-12 col-lg-6 px-3">
                <section>
                  {/* product category */}
                  <p className="m-0 text-black-50 fw-4">
                    {product.subcategory.toUpperCase()}
                  </p>
                  {/* product name */}
                  <h4 className="fw-4 m-0">{product.name}</h4>
                  {/* star rating */}
                  <div className="fl-b-100">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-half"></ion-icon>
                    <span className="mx-4">5 Reviews</span>
                  </div>
                  {/* product color variance  */}
                  <h2 className="fw-bold mt-3 _pr border-tb py-3">
                    $ {product.price}
                  </h2>
                  {/* VARIATIONS AVAILABLE */}
                  <p>VARIATIONS AVAILABLE</p>
                  {product.color && product.color.length > 0 ? (
                    <div className="color-variance">
                      <span>Color:</span>
                      <label className="mx-2">
                        {product.color.map((item, i) => {
                          return (
                            <label
                              key={i}
                              className={`d-inline-block border rounded-1 px-2 mx-1 clr_btn ${
                                colorCount === i && `active`
                              }`}
                              style={{ background: item.color }}
                            >
                              <button
                                className="border-none fs-p8"
                                onClick={() => setColorCount(i)}
                              ></button>
                            </label>
                          );
                        })}
                      </label>
                    </div>
                  ) : null}
                  {product.size && product.size.length > 0 ? (
                    <div className="mt-2 d-flex">
                      <span>Sizes:</span>
                      <label className="mx-2 d-inline">
                        {product.size.map((item, i) => {
                          return (
                            <label
                              key={i}
                              className={`d-inline-block border rounded-1 px-1 bg-grey-10 mx-1 my-1 sz_btn ${
                                sizeCount === i && `active`
                              }`}
                            >
                              <button
                                onClick={() => setSizeCount(i)}
                                className="border-none fs-p8"
                              >
                                EU {item.size}
                              </button>
                            </label>
                          );
                        })}
                      </label>
                    </div>
                  ) : null}
                  <div className="horizontal-divider js-evenly my-2"></div>
                  {/* count in stock & SKU*/}
                  <div className="mt-2 d-flex f-c-r at-c">
                    {/* count in stock */}
                    <label className="db-s">
                      <span className="fw-4">Availability:</span>
                      <span className="px-2 fw-light">
                        {product.qty < 1
                          ? "Out of Stock"
                          : `${product.qty} in Stock`}
                      </span>
                    </label>
                    {/* Stock keeping unit SKU*/}
                    <label className="db-s">
                      <span className="fw-4">SKU:</span>
                      <span className="px-2 fw-light">unique generator</span>
                    </label>
                    {/* QUANTITY */}
                    <div className="mt-2 d-flex db-s">
                      {/* quantity reduction and addition counter */}
                      <div className="qty">
                        {product.qty < 1 ? null : (
                          <label className="mx-2">
                            {/* subtract quantity button */}
                            <button
                              className="_qty_btn"
                              onClick={() =>
                                setCount((prev) =>
                                  count === 1 ? prev - 0 : prev - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              className="_qty_int"
                              type="select"
                              value={count}
                              onChange={
                                count > product.qty
                                  ? setCount(product.qty)
                                  : count < 1
                                  ? setCount(1)
                                  : handleCount
                              }
                            />
                            {/* add quantity button */}
                            <button
                              className="_qty_btn"
                              onClick={() =>
                                setCount((prev) =>
                                  count === product.qty ? prev + 0 : prev + 1
                                )
                              }
                            >
                              +
                            </button>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* add to cart button */}
                  <div className="ad_t_ct border-tb py-2 mt-3">
                    {/* add to cart */}

                    <button
                      className="ad_t_ct_btn d-block shadow"
                      disabled={product.qty < 1 && true}
                    >
                      {product.qty < 1 ? "OUT OF STOCK" : "ADD TO CART"}
                    </button>
                  </div>
                </section>
              </div>
            </div>
            {/* BOTTOM LINK */}
            <div className="mt-11">
              <Link className="link" to={"/home"}>
                contact seller for more information
              </Link>
            </div>
          </div>
          {/* DESCRIPTION & REVIEWS */}
          <div className="col-12 bg-white shadow rounded-1 px-5 py-3 h-5">
            <div className="row g-3">
              {/* DESCRIPTION & REVIEW */}
              <div className="col-lg-8 col-sm-12">
                <div className="de_r">
                  <button
                    onClick={() => {
                      setDescription(product.description), setIdC(1);
                    }}
                    className={`fs-4 border-none fw-light bg-none px-2 ${
                      idC == 1 && `border-bottom fw-normal`
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => {
                      setDescription("reviews"), setIdC(2);
                    }}
                    className={`border-none fs-4 bg-none px-2 fw-light ${
                      idC == 2 && `border-bottom fw-normal`
                    }`}
                  >
                    Reviews
                  </button>
                  <div className="horizontal-divider"></div>
                  <p>{description}</p>
                  {description == product.description && (
                    <>
                      {/* features */}
                      <p className="bg-grey-10 m-0 px-2">Features:</p>
                      <ul className="my-2 mx-0">
                        {product.features && product.features.length > 0 ? (
                          product.features.map((item, i) => {
                            return (
                              <li key={i} className="p-0 txt-grey-100">
                                {item.feature}
                              </li>
                            );
                          })
                        ) : (
                          <p className="txt-grey-100 mx-3 my-1">Not included</p>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>
              {/* ADDITIONAL INFORMATION, ADD TO CART CARD SMALL */}
              <div className="col-lg-4 col-sm-12">
                <div>
                  <h6>Additional Information</h6>
                  {/* Dimensions */}
                  <p className="bg-grey-10 m-0 px-2 ">Dimensions:</p>
                  {product.dimensions ? (
                    <p className="txt-grey-100 mx-3 my-1">
                      {product.dimensions}
                    </p>
                  ) : (
                    <p className="txt-grey-100 mx-3 my-1">Not included</p>
                  )}
                  {/* Weight */}
                  <p className="bg-grey-10 m-0 px-2 mt-3">Weight:</p>
                  {product.weight ? (
                    <p className="txt-grey-100 mx-3 my-1">{product.weight}</p>
                  ) : (
                    <p className="txt-grey-100 mx-3 my-1">Not included</p>
                  )}
                  {/* ADD TO CART */}
                  <div className="border rounded-1 p-1 shadow bg-white d-flex mt-3 ad_c_plc ">
                    <div className="img_sld d-inline-block fl-b-30">
                      <img
                        src={`../${product.url[0].img}`}
                        alt={product.name}
                        width={"100%"}
                        height={"auto"}
                        className="img_sld border rounded-1"
                      />
                    </div>
                    <div className="d-inline-block ad_c_btn px-1 fl-b-70">
                      <p>{product.name}</p>
                      <h5 className="fw-bold">$ {product.price}</h5>
                    </div>
                    <div className="ad_t_ct mt-1 fl-b-100">
                      <button
                        className="ad_t_ct_btn w-100 d-block shadow"
                        disabled={product.qty < 1 && true}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SIMILAR PRODUCTS */}
          <SimCardCarousel
            cards={productData}
            category={product.category}
            heading="YOU MAY ALSO LIKE"
            link="/view"
            name={product.name}
          />
        </div>
      );
    }
    return null;
  });

  return <div className="container">{productDetail}</div>;
}

export default ProductDetailPage;
