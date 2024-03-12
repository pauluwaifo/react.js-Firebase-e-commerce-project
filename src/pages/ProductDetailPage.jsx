import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../contexts/appContext";
import { Link } from "react-router-dom";
import SimCardCarousel from "../components/SimCardCarousel";
import axios from "axios";
import {
  ADD_SHIPPING_ADDRESS,
  ADD_TO_CART_SUCCESS,
  ADD_TO_WHISH_LIST_SUCCESS,
  DELETE_CART_ITEM,
  DELETE_WHISH_LIST_ITEM,
  UPDATE_CART_ITEM,
} from "../constants/constant";
import StarRating from "../components/StarRating";
import { useLocation } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();
  const { pathname } = useLocation();

  const {
    productData,
    dispatchCart,
    cart,
    dispatchShipping,
    shipping,
    dispatchWishlist,
    wishlist,
  } = useContext(AppContext);
  const [img_sld, setImg_sld] = useState(0);
  const [description, setDescription] = useState("");
  const [idC, setIdC] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const [stateCity, setStateCity] = useState([]);
  const [sizeCount, setSizeCount] = useState(0);
  const [colorCount, setColorCount] = useState(0);
  const [variantId, setVariantId] = useState(null);
  const [variantPrice, setVariantPrice] = useState(null);
  const [variantQty, setVariantQty] = useState(null);
  const [alert, setAlert] = useState(0);

  // PRODUCT DELIVERY AND QUANTITY STATES
  const [qtyCount, setQtyCount] = useState(Number(1));
  const [state, setState] = useState("Abia");
  const [city, setCity] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Update description from productData
    const matchedProduct = productData.find((product) => product.id === id);
    if (matchedProduct) {
      setDescription(matchedProduct.description);
    }

    // Check if item is in cart
    const isInCart = cart.some((item) => {
      if (
        (item.variantId !== null &&
          item.variantId === variantId &&
          item.qty > 0) ||
        (item.variantId === null && item.id === id && item.qty > 0)
      ) {
        setQtyCount(item.qty);
        return true; // Break out of the some loop when a match is found
      }
      return false;
    });

    // CHECK IF PRODUCT IS IN WISHLIST
    const isInWishlist = wishlist.some((item) => {
      if (item.id === id) {
        return true;
      } // Break out of the some loop when a match is found
      return false;
    });

    setInCart(isInCart);
    setInWishlist(isInWishlist);
  }, [productData, cart, id, variantId, colorCount, sizeCount, pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/local-json/states-and-cities.json");
        setStateCity(response.data);
      } catch (error) {
        console.log("error fetching data", error.message);
      }
      shipping.map((shipping) => {
        setState(shipping.state);
        setCity(shipping.city);
        setAddress(shipping.address);
      });
    };

    fetchData();
  }, []);

  const productDetail = productData.map((product, i) => {
    try {
      if (product.id === id) {
        const shippingId = "shipping";
        const handleAddToCart = () => {
          const isProductInCart =
            cart &&
            cart.length > 0 &&
            cart.some((item) =>
              item.variantId !== null
                ? item.variantId == variantId
                : item.id === product.id
            );
  
          if (isProductInCart) {
            dispatchCart({
              type: UPDATE_CART_ITEM,
              payload: {
                id: product.id,
                variantId: variantId,
                qty: qtyCount,
              },
            });
          } else {
            dispatchCart({
              type: ADD_TO_CART_SUCCESS,
              payload: {
                id: product.id,
                variantId: variantId,
                img: product.url[0].img,
                name: product.name,
                url: product.url,
                category: product.category,
                subcategory: product.subcategory,
                qty: qtyCount,
                inStock: variantQty !== null ? variantQty : product.qty,
                price: variantPrice !== null ? variantPrice : product.price,
                discountPrice: product.discountPrice,
                color,
                size,
              },
            }),
              setAlert(1);
            setTimeout(() => {
              setAlert(0);
            }, 5000);
          }
          setInCart(true);
          setQtyCount(Number(1));
        };
        const handleRemoveItemFromCart = () => {
          dispatchCart({
            type: DELETE_CART_ITEM,
            payload: { id: product.id, variantId: variantId },
          });
          setInCart(false);
        };
        const handleAddToWishlist = () => {
          dispatchWishlist({
            type: ADD_TO_WHISH_LIST_SUCCESS,
            payload: {
              id: product.id,
              variantId: variantId,
              img: product.url[0].img,
              name: product.name,
              price: variantPrice !== null ? variantPrice : product.price,
              discountPrice: product.discountPrice,
              url: product.url
            },
          });
          setInWishlist(true);
        };
        const handleRemoveItemFromWishlist = () => {
          dispatchWishlist({ type: DELETE_WHISH_LIST_ITEM, payload: product.id });
          setInWishlist(false);
        };
        const selectedCity = stateCity.find(
          (stateObj) => stateObj.name === state
        );
        const cityOptions = [];
        if (selectedCity) {
          selectedCity.cities.forEach((cities, i) => {
            cityOptions.push(
              <option key={i} value={cities && cities}>
                {cities}
              </option>
            );
          });
        }
  
        return (
          <div className="row g-3 mt-12" key={i}>
            {/* SUCCESS ALERT FOR ADDED PRODUCT */}
            <div
              style={{ opacity: alert, transition: "all .3s ease-in-out" }}
              className="alert bg-success text-white al-c"
            >
              <span>PRODUCT ADDED SUCCESSFULLY</span>
              <button onClick={() => setAlert(0)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={25}
                  fill="white"
                >
                  <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
                </svg>
              </button>
            </div>
            {/* PRODUCT INFORMATION, TOP LINKS, ADD_TO_CART , ADD_TO_WISHLIST_BTN AND QTY...*/}
            <div className="col-lg-9 col-sm-12 h-5">
              <div className="bg-white shadow rounded-1 px-5 py-2">
                <div className="row g-3">
                  {/* TOP LINKS  */}
                  <div className="col-sm-12 col-lg-12 mt-4">
                    <div>
                      <ul className="b-l_">
                        <li>
                          <Link to={"/"}>HOME</Link>
                        </li>
                        <li className="mx-1">&gt;</li>
                        <li>
                          <Link to={`/${product.category}`}>
                            {product.category.toUpperCase()}
                          </Link>
                        </li>
                        <li className="mx-1">&gt;</li>
                        <li>
                          <Link
                            to={`/${product.category}/${product.subcategory}`}
                          >
                            {product.subcategory.toUpperCase()}
                          </Link>
                        </li>
                        <li className="mx-1">&gt;</li>
                        <li>{product.name.toUpperCase()}</li>
                      </ul>
                    </div>
                  </div>
  
                  {/* PRODUCT IMAGE ON DISPLAY, LINKS TO SHARE*/}
                  <div className="col-sm-12 col-lg-5 ">
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
                    {/* PRODUCT IMAGE SLIDE/CHOICE TO DISPLAY / SOCIAL LINKS*/}
                    <div className="d-flex mt-2">
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
                    <div className="horizontal-divider mt-2"></div>
                    {/* SOCIAL LINKS */}
                    <div className="mt-2">
                      <p className="fs-p8 fw-5 m-0 p-0">SHARE THIS PRODUCT</p>
                      <label className="mt-1 social" id="social links">
                        <Link to={"/home"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={"20"}
                          >
                            <path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z" />
                          </svg>
                        </Link>
                        <Link to={"/home"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={"20"}
                          >
                            <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
                          </svg>
                        </Link>
                        <Link to={"/home"}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={"20"}
                          >
                            <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z" />
                            <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z" />
                          </svg>
                        </Link>
                      </label>
                    </div>
                  </div>
                  {/* PRODUCT NAME, CATEGORY, RATING, PRICE, COLOR, SIZE, ADD TO CART */}
                  <div className=" col-sm-12 col-lg-7 px-2">
                    <div>
                      {/* product category */}
                      <p className="m-0 text-black-70 fw-4">
                        {product.subcategory.toUpperCase()}
                      </p>
                      {/* product name */}
                      <h4 className="fw-4 m-0">{product.name}</h4>
  
                      {/* PRODUCT NAME, CATEGORY, RATING, PRICE, REVIEWS, DISCOUNT PRICE, DISCOUNT PERCENTAGE CALCULATOR */}
                      <div className="border-tb py-2 mt-1">
                        {/* DISCOUNT PERCENTAGE CALCULATOR */}
                        {product.discountPrice && (
                          <span className="bg-none border-primary primary-color fs-p7 fw-bold d-inline-block text-white px-2 py-1">
                            {(() => {
                              if (
                                product.price <= 0 ||
                                product.discountPrice <= 0 ||
                                product.discountPrice >= product.Price
                              ) {
                                console.error("Invalid input values");
                                return null;
                              }
  
                              const discountAmount =
                                product.price - product.discountPrice;
                              const discountPercentage =
                                (discountAmount / product.price) * 100;
  
                              return `${Math.floor(discountPercentage)}% OFF`;
                            })()}
                          </span>
                        )}
                        {/* DISCOUNT PRICE */}
                        <span className="d-block fs-1 al-l fs-2 fw-bold rounded-2 mt-1">
                          {product.discountPrice && `$${product.discountPrice}`}
                        </span>
                        {/* product price  */}
                        <h2
                          className={`fw-bold m-0 _pr ${
                            product.discountPrice ? `_dcp fs-1` : `fs-2`
                          }`}
                        >
                          {product.variants && product.variants.length > 0 ? (
                            <>
                              {product.variants.map((variant, i) => {
                                if (variant.sizes) {
                                  if (color === null || color === variant.color) {
                                    return variant.sizes.map((item, j) => (
                                      <span key={j}>
                                        {sizeCount === j && (
                                          <span>$ {item.price}</span>
                                        )}
                                      </span>
                                    ));
                                  }
                                }
                                if (!variant.sizes && variant.color) {
                                  if (color === null || color === variant.color) {
                                    return (
                                      <span key={i}>
                                        {colorCount === i && (
                                          <span>$ {variant.price}</span>
                                        )}
                                      </span>
                                    );
                                  }
                                }
                                return null; // Return null for variants without sizes or with different colors
                              })}
                              {product.variants.every((item) => !item.sizes && !item.color) && (
                                <span>${product.price}</span>
                              )}
  
                            </>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </h2>
  
                        {/* in stock or out of stock*/}
                        <span className="fw-normal">
                          {product.qty < 1 ? "Out of Stock" : `In stock`}
                        </span>
                        {/* reviews */}
                        <div className="d-flex ali-center">
                          <div className="d-inline-block ali-center d-flex">
                            {/* star rating */}
                            <StarRating fontSize={"1.5rem"} />
                          </div>
                          <div className="px-1 d-flex ali-center">
                            <Link
                              className="link fs-6 txt-grey-100"
                              to="#reviews"
                            >
                              +(5 reviews)
                            </Link>
                          </div>
                        </div>
                      </div>
  
                      {/* VARIATIONS AVAILABLE */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="py-2">
                          <p className="fs-1 my-0">VARIATIONS AVAILABLE</p>
                          {/* product color variance */}
                          {product.variants && product.variants.length > 0 ? (
                            <div className="mt-2 ali-center">
                              <label className="d-inline">
                                {product.variants.map((item, i) => {
                                  if (item.color) {
                                    return (
                                      <label
                                        key={i}
                                        className={`d-inline-block rounded-full border mx-1 clr_btn ${
                                          colorCount === i && `active_clr`
                                        }`}
                                        style={{ background: item.color }}
                                        onClick={() => {
                                          setColorCount(i);
                                          setSizeCount(0);
                                          setColor(item.color);
                                          setVariantId(item.id);
                                          console.log(item.id);
                                        }}
                                      >
                                        {color == null && colorCount === i
                                          ? setColor(item.color)
                                          : null}
                                      </label>
                                    );
                                  }
                                  return null;
                                })}
                              </label>
                            </div>
                          ) : null}
                          {/* product size variance */}
                          {product.variants && product.variants.length > 0 ? (
                            <div className="mt-2 ali-center">
                              <label className="d-inline">
                                {product.variants.map((variant) => {
                                  if (
                                    variant.sizes &&
                                    color !== null &&
                                    color == variant.color
                                  ) {
                                    return variant.sizes.map((item, j) => (
                                      <label
                                        key={j}
                                        className={`d-inline-block fs-p8 border px-2 py-2 bg-none mx-1 my-1 sz_btn ${
                                          sizeCount === j && "active"
                                        }`}
                                        onClick={() => {
                                          setSizeCount(j);
                                          setSize(item.size);
                                          setVariantId(item.id);
                                          setVariantPrice(item.price);
                                          setVariantQty(item.qty);
                                        }}
                                      >
                                        EU {item.size}
                                        {size == null &&
                                          sizeCount == j &&
                                          (setSize(item.size),
                                          setVariantId(item.id),
                                          setVariantPrice(item.price),
                                          setVariantQty(item.qty))}
                                      </label>
                                    ));
                                  } else if (variant.sizes && color == null) {
                                    return variant.sizes.map((item, j) => (
                                      <label
                                        key={j}
                                        className={`d-inline-block fs-p8 border px-2 py-2 bg-none mx-1 my-1 sz_btn ${
                                          sizeCount === j && "active"
                                        }`}
                                        onClick={() => {
                                          setSizeCount(j);
                                          setSize(item.size);
                                          setVariantId(item.id);
                                          setVariantPrice(item.price);
                                          setVariantQty(item.qty);
                                        }}
                                      >
                                        EU {item.size}
                                        {size == null &&
                                          sizeCount == j &&
                                          (setSize(item.size),
                                          setVariantId(item.id),
                                          setVariantPrice(item.price),
                                          setVariantQty(item.qty))}
                                      </label>
                                    ));
                                  }
                                })}
                              </label>
                            </div>
                          ) : null}
                        </div>
                      )}
                      {/* add to cart button and quantity button*/}
                      <div className="ad_t_ct mt-3">
                        {/* QUANTITY */}
                        {inCart ? (
                          <div className="mt-2 d-flex db-s js-start fl-b-100">
                            {/* quantity reduction and addition counter */}
                            <div className="qty">
                              {product.qty < 1 ? null : (
                                <label className="mx-2">
                                  {/* subtract quantity button */}
                                  <button
                                    className="_qty_btn"
                                    onClick={() => {
                                      setQtyCount((prev) =>
                                        prev === 1 ? prev : prev - 1
                                      );
                                      if (inCart) {
                                        dispatchCart({
                                          type: UPDATE_CART_ITEM,
                                          payload: {
                                            id: product.id,
                                            variantId: variantId,
                                            qty: qtyCount > 1 ? qtyCount - 1 : 1,
                                          },
                                        });
                                      }
                                      if (qtyCount === 1) {
                                        handleRemoveItemFromCart();
                                      }
                                    }}
                                  >
                                    -
                                  </button>
                                  <input
                                    className="_qty_int"
                                    type="number" // Use "number" type instead of "select"
                                    value={qtyCount}
                                    onChange={(e) => {
                                      const newQty = parseInt(e.target.value, 10);
  
                                      if (newQty > product.qty) {
                                        setQtyCount(product.qty);
                                      } else if (newQty < 1) {
                                        setQtyCount(1);
                                      } else if (qty == null) {
                                        setQtyCount(1);
                                      } else {
                                        setQtyCount(newQty);
                                        if (inCart) {
                                          dispatchCart({
                                            type: UPDATE_CART_ITEM,
                                            payload: {
                                              id: product.id,
                                              variantId: variantId,
                                              qty: newQty,
                                              size: size,
                                            },
                                          });
                                        }
                                      }
                                    }}
                                  />
                                  <button
                                    className="_qty_btn"
                                    onClick={() => {
                                      setQtyCount((prev) =>
                                        prev === product.qty ? prev : prev + 1
                                      );
  
                                      if (inCart) {
                                        dispatchCart({
                                          type: UPDATE_CART_ITEM,
                                          payload: {
                                            id: product.id,
                                            variantId: variantId,
                                            qty:
                                              variantQty === null
                                                ? qtyCount < product.qty
                                                  ? qtyCount + 1
                                                  : product.qty
                                                : qtyCount < variantQty
                                                ? qtyCount + 1
                                                : variantQty,
                                          },
                                        });
                                      }
                                    }}
                                  >
                                    +
                                  </button>
                                </label>
                              )}
                            </div>
                          </div>
                        ) : (
                          // ADD TO CART BUTTON
                          <button
                            className="ad_t_ct_btn d-block w-100 shadow"
                            disabled={product.qty < 1 || (inCart && true)}
                            onClick={handleAddToCart}
                          >
                            {product.qty < 1
                              ? "OUT OF STOCK"
                              : inCart
                              ? "PRODUCT IN CART"
                              : "ADD TO CART"}
                          </button>
                        )}
                      </div>
                      {/* add to wish list*/}
                      <div className="mt-3 d-flex border-tb js-center fl-b-100 py-2">
                        <button
                          onClick={() => {
                            !inWishlist
                              ? handleAddToWishlist()
                              : handleRemoveItemFromWishlist();
                          }}
                          className="ad_t_wh_btn fs-p8 d-block"
                        >
                          {inWishlist
                            ? `REMOVE FROM WISH LIST`
                            : `ADD TO WISH LIST`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BOTTOM LINK */}
                <div className="mt-11">
                  <Link className="link" to={"/home"}>
                    contact seller for more information
                  </Link>
                </div>
              </div>
            </div>
            {/* BILLING AND SHIPPING ADDRESS FORM */}
            <div className="col-lg-3 col-sm-12 ">
              <div className="bg-white shadow rounded-1 px-2 py-2">
                {/* BILLING ADDRESS */}
                <section>
                  <h6>Billing Information</h6>
                  <form className="us_lc_fr px-2">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                    <input type="tel" placeholder="Phone" />
                    <input type="email" placeholder="Email" />
                  </form>
                </section>
                {/* SHIPPING ADDRESS */}
                <section className="mt-2">
                  <h6>Choose your location</h6>
                  <form className="us_lc_fr px-2">
                    {/* state */}
                    <select
                      className="select minimal"
                      value={state && state} // Set the selected value using 'value' prop
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        setState(selectedState); // Update the local state
  
                        dispatchShipping({
                          type: ADD_SHIPPING_ADDRESS,
                          payload: {
                            id: shippingId,
                            state: state,
                            city: city,
                            address: address,
                          },
                        });
                      }}
                    >
                      {stateCity.map((states, i) => (
                        <option key={i} value={states && states.name}>
                          {states.name}
                          {state == null && 0 == i && setState(states.name)}
                        </option>
                      ))}
                    </select>
                    {/* city */}
                    <select
                      value={city && city}
                      onChange={(e) => (
                        setCity(e.target.value),
                        dispatchShipping({
                          type: ADD_SHIPPING_ADDRESS,
                          payload: {
                            id: shippingId,
                            state: state,
                            city: e.target.value,
                            address: address,
                          },
                        })
                      )}
                      className="select minimal"
                    >
                      {cityOptions}
                    </select>
                    {/* address */}
                    <textarea
                      onChange={(e) => (
                        setAddress(e.target.value),
                        dispatchShipping({
                          type: ADD_SHIPPING_ADDRESS,
                          payload: {
                            id: shippingId,
                            state: state,
                            city: city,
                            address: e.target.value,
                          },
                        })
                      )}
                      value={address && address}
                      placeholder="Address"
                      rows="2"
                    />
                  </form>
                </section>
              </div>
            </div>
            {/* DESCRIPTION & REVIEWS & ADD_TO_CART_BTN_SMALL*/}
            <div className="col-12 h-5">
              <div className="bg-white shadow rounded-1 px-5 py-3">
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
                              <p className="txt-grey-100 mx-3 my-1">
                                Not included
                              </p>
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
                      {/* SMALL ADD TO CART PRICE & NAME*/}
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
                        {/* product price and name */}
                        <div className="d-inline-block ad_c_btn px-1 fl-b-70">
                          {/* PRODUCT NAME */}
                          <p className="m-0 py-1">{product.name}</p>
  
                          {/* DISCOUNT PRICE */}
                          <h5 className="d-block al-l fw-bold rounded-2 mt-1 m-0">
                            {product.discountPrice && `$${product.discountPrice}`}
                          </h5>
  
                          {/* PRODUCT PRICE */}
                          <h5
                            className={`fw-bold m-0 ${
                              product.discountPrice && `_dcp fs-1 `
                            }`}
                          >
                            {product.variants && product.variants.length > 0 ? (
                              <>
                                {product.variants.map((variant) => {
                                  if (variant.sizes) {
                                    if (
                                      color === null ||
                                      color === variant.color
                                    ) {
                                      return variant.sizes.map((item, j) => (
                                        <span key={j}>
                                          {sizeCount === j && (
                                            <span>${item.price}</span>
                                          )}
                                        </span>
                                      ));
                                    }
                                  }
                                  return null; // Return null for variants without sizes or with different colors
                                })}
                                {product.variants.every(
                                  (item) => !item.sizes
                                ) && <span>${product.price}</span>}
                              </>
                            ) : (
                              <span>${product.price}</span>
                            )}
                          </h5>
  
                          <StarRating fontSize={"1.2rem"} />
                        </div>
                        {/* add to cart btn */}
                        <div className="ad_t_ct mt-1 fl-b-100">
                          <button
                            className="ad_t_ct_btn w-100 d-block shadow"
                            disabled={product.qty < 1 || (inCart && true)}
                            onClick={handleAddToCart}
                          >
                            {product.qty < 1
                              ? "OUT OF STOCK"
                              : inCart
                              ? "PRODUCT IN CART"
                              : "ADD TO CART"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* SIMILAR PRODUCTS */}
            <div className="col-12">
              <SimCardCarousel
                cards={productData}
                category={product.category}
                heading="YOU MAY ALSO LIKE"
                name={product.name}
                setQtyCount={setQtyCount}
                display="none"
              />
  
            </div>
            <div className="col-12">
              {wishlist.length > 0 ? (
                <SimCardCarousel
                cards={wishlist}
                wishlist = {wishlist && wishlist.length > 0 ? true : false}
                heading="ITEMS ON YOUR WISHLIST"
                name={product.name}
                setQtyCount={setQtyCount}
                display="none"
              />
               
              ) : null}
            </div>
          </div>
        );
      }
    } catch(err) {
      console.log(err)
    }
    return null;
  });

  return <div className="container">{productDetail}</div>;
}

export default ProductDetailPage;
