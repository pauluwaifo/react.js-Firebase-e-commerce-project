import {
  FETCH_ERROR,
  FETCH_SUCCESS,
  ADD_TO_CART_SUCCESS,
  DELETE_CART_ITEM,
  ADD_TO_CART_ERROR,
  UPDATE_CART_ITEM,
  ADD_SHIPPING_ADDRESS,
  ADD_SHIPPING_ERROR,
  ADD_TO_WHISH_LIST_SUCCESS,
  DELETE_WHISH_LIST_ITEM,
  ADD_TO_WHISH_LIST_ERROR,
} from "../constants/constant";

export const GetProductReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case FETCH_ERROR:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: [...state.cart, action.payload],
        loading: false,
        error: false,
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          if (item.variantId === null) {
            return item.id !== action.payload.id;
          }
          if (item.variantId !== null) {
            return item.variantId !== action.payload.variantId;
          }
          return true;
        }),
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.variantId !== null &&
            item.variantId === action.payload.variantId) ||
          (item.id === action.payload.id && item.variantId === null)
            ? {
                ...item,
                qty: action.payload.qty,
              }
            : item
        ),
      };

    case ADD_TO_CART_ERROR:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const ShippingReducer = (state, action) => {
  switch (action.type) {
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping: state.shipping.map((shipping) =>
          shipping.id == action.payload.id
            ? {
                ...shipping,
                state: action.payload.state,
                city: action.payload.city,
                address: action.payload.address,
              }
            : shipping
        ),
        loading: false,
        error: false,
      };
    case ADD_SHIPPING_ERROR:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const WhishListReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WHISH_LIST_SUCCESS:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        loading: false,
        error: false,
      };
    case DELETE_WHISH_LIST_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => {
          return item.id !== action.payload;
        }),
      };
    case ADD_TO_WHISH_LIST_ERROR:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};
