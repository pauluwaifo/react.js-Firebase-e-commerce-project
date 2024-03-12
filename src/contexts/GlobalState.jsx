import React, { useReducer, useState, useEffect } from "react";
import AppContext from "./appContext";
import {
  GetProductReducer,
  CartReducer,
  ShippingReducer,
  WhishListReducer,
} from "../reducers/myReducer";

import {
  initialState,
  initialCartState,
  initialShippingState,
  initialWishListState,
} from "./initialState";
import { FETCH_ERROR, FETCH_SUCCESS } from "../constants/constant";
import axios from "axios";

function GLobalState(props) {
  const [state, dispatch] = useReducer(GetProductReducer, initialState);
  const [cartState, dispatchCart] = useReducer(CartReducer, initialCartState);
  const [shippingState, dispatchShipping] = useReducer(
    ShippingReducer,
    initialShippingState
  );
  const [wishListState, dispatchWishlist] = useReducer(
    WhishListReducer,
    initialWishListState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/local-json/products.json");
        dispatch({
          type: FETCH_SUCCESS,
          payload: response.data.products.data.items,
        });
      } catch (error) {
        console.log("error fetching data", error.message);
        dispatch({ type: FETCH_ERROR, payload: error.message });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
    localStorage.setItem("shipping", JSON.stringify(shippingState.shipping));
    localStorage.setItem("wishlist", JSON.stringify(wishListState.wishlist));
  }, [cartState.cart, shippingState.shipping, wishListState.wishlist]);

  return (
    <AppContext.Provider
      value={{
        dispatch,
        productData: state.data,
        loading: state.loading,
        cart: cartState.cart,
        dispatchCart,
        shipping: shippingState.shipping,
        dispatchShipping,
        dispatchWishlist,
        wishlist: wishListState.wishlist
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default GLobalState;
