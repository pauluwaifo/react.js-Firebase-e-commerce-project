export const initialState = {
  data: [],
  loading: true,
  error: null,
  productDetail: [],
};
export const initialCartState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  loading: true,
  error: null,
};
export const initialWishListState = {
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  loading: true,
  error: null,
};
export const initialShippingState = {
  shipping: JSON.parse(localStorage.getItem("shipping")) || [
    { id: "shipping", state: null, city: null, address: null },
  ],
  loading: true,
  error: null,
};
