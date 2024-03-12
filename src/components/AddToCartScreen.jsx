import React from "react";
import AppContext from "../contexts/appContext";
import { useContext, useState, useEffect } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_WHISH_LIST_SUCCESS,
  DELETE_CART_ITEM,
  DELETE_WHISH_LIST_ITEM,
  UPDATE_CART_ITEM,
} from "../constants/constant";

function AddToCartScreen({ itemId, setDisplay, display }) {
  const { productData, dispatchCart, cart, dispatchWishlist, wishlist } =
    useContext(AppContext);

  const [description, setDescription] = useState("");
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const [sizeCount, setSizeCount] = useState(0);
  const [colorCount, setColorCount] = useState(0);
  const [variantId, setVariantId] = useState(null);
  const [variantPrice, setVariantPrice] = useState(null);
  const [variantQty, setVariantQty] = useState(null);
  const [alert, setAlert] = useState(0);

  // PRODUCT DELIVERY AND QUANTITY STATES
  const [qtyCount, setQtyCount] = useState(Number(1));
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    // Update description from productData
    const matchedProduct = productData.find((product) => product.id === itemId);
    if (matchedProduct) {
      setDescription(matchedProduct.description);
    }

    // Check if item is in cart
    const isInCart = cart.some((item) => {
      if (
        (item.variantId !== null &&
          item.variantId === variantId &&
          item.qty > 0) ||
        (item.variantId === null && item.id === itemId && item.qty > 0)
      ) {
        setQtyCount(item.qty);
        return true; // Break out of the some loop when a match is found
      }
      return false;
    });

    // CHECK IF PRODUCT IS IN WISHLIST
    const isInWishlist = wishlist.some((item) => {
      if (item.id === itemId) {
        return true;
      } // Break out of the some loop when a match is found
      return false;
    });

    setInCart(isInCart);
    setInWishlist(isInWishlist);
  }, [productData, cart, itemId, variantId, colorCount, sizeCount]);

  return productData.map((product, i) => {
    if (product.id == itemId) {
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
            url: product.url,
          },
        });
        setInWishlist(true);
      };
      const handleRemoveItemFromWishlist = () => {
        dispatchWishlist({ type: DELETE_WHISH_LIST_ITEM, payload: product.id });
        setInWishlist(false);
      };
      return (
        <label key={i}>
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
          {/* CONTENT */}
          <div
            key={i}
            className="add_container px-2 container"
            style={{ display: display }}
          >
            <div className="row g-3">
              <div className="col-3"></div>
              <div className="col-lg-9">
                <div className="bg-white shadow-full p-2">
                  <div className="row">
                    {/* CLOSE WINDOW BUTTON */}
                    <div className="col-12 py-2 px-3 al-r">
                      <button
                        className="border-none outline-none bg-none"
                        onClick={() => setDisplay("none")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={30}
                          fill="black"
                        >
                          <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
                        </svg>
                      </button>
                    </div>
                    {/* IMAGE CONTAINER, ADD TO CART AND WISHLIST*/}
                    <div className="col-5">
                      <div className="ovx-auto d-flex">
                        {product.url.map((item, i) => (
                          <img
                            className="d-inline-block mx-1 border w-70"
                            key={i}
                            src={item.img}
                            alt={item.name}
                          />
                        ))}
                      </div>
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
                                            qty:
                                              qtyCount > 1 ? qtyCount - 1 : 1,
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
                                      const newQty = parseInt(
                                        e.target.value,
                                        10
                                      );

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
                    {/* TEXT(s) CONTAINER */}
                    <div className="col-7">
                      {/* TEXT CONTAINER */}
                      <div>
                        <p className="m-0">
                          {product.subcategory.toUpperCase()}
                        </p>
                        <h5>{product.name}</h5>
                      </div>
                      <div className="horizontal-divider"></div>

                      <div className="py-2 mt-1">
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
                                  if (
                                    color === null ||
                                    color === variant.color
                                  ) {
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
                                  if (
                                    color === null ||
                                    color === variant.color
                                  ) {
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
                              {product.variants.every(
                                (item) => !item.sizes && !item.color
                              ) && <span>${product.price}</span>}
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
                      <div className="border-tb py-2">
                        <p className="fs-p9 m-0">Description</p>
                        <p className=" fs-p8 px-1 text-black-60 m-0 add_cta_text">
                          {product.description}
                        </p>
                      </div>
                      {/* VARIATIONS AVAILABLE */}
                      {product.variants && product.variants.length > 0 && (
                        <div className="py-2">
                          <p className="fs-p9 my-0">Variations Available</p>
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
                                          ? (setColor(item.color),
                                            console.log(color))
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </label>
      );
    }
  });
}

export default AddToCartScreen;
