import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/appContext";
import { DELETE_CART_ITEM, UPDATE_CART_ITEM } from "../constants/constant";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, load, error, dispatchCart, productData } =
    useContext(AppContext);

  const nav = useNavigate();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="container ">
      <div className="row g-3">
        <div className="mt-4"></div>
        {/* TOP LINKS */}
        <div className="col-12 mt-13">
          <ul className="b-l_">
            <li>
              <Link className="fs-1 " to={"/"}>
                Home
              </Link>
            </li>
            <li className="mx-1">&gt;</li>
            <li>
              <Link className="fs-1 fw-5" to={""}>
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-8 col-sm-12 bg-white border shadow rounded-1 px-2 py-2">
          <table className="ct-tb">
            {/* TABLE HEAD */}
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            {/* MARGIN */}
            <tbody>
              <tr>
                <td></td>
              </tr>
            </tbody>
            {cart &&
              cart.map((item, i) => (
                // CART CONTENT
                <tbody key={i}>
                  {/* CART CONTENT */}
                  <tr className="bg-white border shadow">
                    {/* IMAGE AND PRODUCT NAME */}
                    <td
                      onClick={() => nav(`/product_/${item.id}`)}
                      className="d-flex ali-center cursor-p"
                    >
                      <img
                        className="_ct_img fl-b-20"
                        src={item.img}
                        alt={item.name}
                      />
                      <div className="fl-b-80 js-center px-2">{item.name}</div>
                    </td>
                    {/* PRODUCT SIZE */}
                    <td className="al-c">
                      <span className="border px-2 py-1">
                        {item.size && item.size ? "EU " + item.size : "NA"}
                      </span>
                    </td>
                    {/* PRODUCT COLOR */}
                    <td className="al-c">
                      <span className="border px-2 py-1">
                        {item.color && item.color
                          ? capitalizeFirstLetter(item.color)
                          : "NA"}
                      </span>
                    </td>
                    {/* PRODUCT QTY */}
                    <td className="al-c">
                      <button
                        className="_qty_btn_ct"
                        onClick={() => {
                          dispatchCart({
                            type: UPDATE_CART_ITEM,
                            payload: {
                              id: item.id,
                              variantId: item.variantId,
                              qty: item.qty > 1 ? item.qty - 1 : 1,
                            },
                          });
                        }}
                      >
                        -
                      </button>
                      <input
                        className="_qty_int_ct"
                        type="text" // Use "number" type instead of "text"
                        value={item.qty}
                        disabled
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value, 10) || 1; // Ensure a valid number, default to 1
                          dispatchCart({
                            type: UPDATE_CART_ITEM,
                            payload: {
                              id: item.id,
                              variantId: item.variantId,
                              qty: newQty,
                            },
                          });
                        }}
                      />
                      <button
                        className="_qty_btn_ct"
                        onClick={() => {
                          dispatchCart({
                            type: UPDATE_CART_ITEM,
                            payload: {
                              id: item.id,
                              variantId: item.variantId,
                              qty:
                                item.qty == item.inStock
                                  ? item.qty + 0
                                  : item.qty + 1,
                            },
                          });
                        }}
                      >
                        +
                      </button>
                    </td>
                    {/* TOTAL PRICE */}
                    <td className="al-c fw-bold">
                      ${" "}
                      {item.discountPrice && item.discountPrice
                        ? item.discountPrice * item.qty
                        : item.price * item.qty}
                    </td>
                    {/* DELETE ART ITEM */}
                    <td className="al-c">
                      <button
                        className="btn"
                        onClick={() =>
                          dispatchCart({
                            type: DELETE_CART_ITEM,
                            payload: {
                              id: item.id,
                              variantId: item.variantId,
                            },
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={25}
                          fill="grey"
                        >
                          <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
