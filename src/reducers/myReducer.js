import { FETCH_ERROR, FETCH_SUCCESS } from "../constants/constant";

export const GetProductReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: true,
        error: false,
      };
    case FETCH_ERROR:
      return { ...state, data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

