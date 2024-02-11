import React, { useReducer, useState, useEffect } from "react";
import AppContext from "./appContext";
import { GetProductReducer } from "../reducers/myReducer";
import { initialState } from "./initialState";
import { FETCH_ERROR, FETCH_SUCCESS } from "../constants/constant";
import axios from "axios";

function GLobalState(props) {
  const [state, dispatch] = useReducer(GetProductReducer, initialState);
 

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

  return (
    <AppContext.Provider
      value={{
        dispatch,
        productData: state.data,
        loading: state.loading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default GLobalState;
