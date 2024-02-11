import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../contexts/appContext";
import axios from "axios";
import Fuse from "fuse.js";
// import SearchedProducts from "./SearchedProducts";

function Test() {
  const { dispatch,  productData } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState();
  const [search, setSearch] = useState();
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState();


  // fuse.js options to correct search queries
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.4,
    keys: ["name", "keywords", "category"],
  };

  const fuse = new Fuse(productData, options);

  // function to handle search
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    const result = fuse.search(value.toLowerCase());
    const items = result.map((result) => result.item);
    setSearchResults(items);
  };

  const handleSubmit = () => {
    if (searchResults) {
      searchResults.map((result) => {
        if (
          result.keywords.toLowerCase().startsWith(search[0]) ||
          result.name.toLowerCase().startsWith(search[0]) ||
          result.category.toLowerCase().startsWith(search[0]) ||
          result.subcategory.toLowerCase().startsWith(search[0])
        )
          console.log({
            keywords: result.keywords,
            name: result.name,
            category: result.category,
            subcategory: result.subcategory,
          });
         
      });
      dispatch({type: PRODUCTDATA, payload: searchResults})
      console.log(products)
    }
  };
  
  const Item = (e) => {
    setNewItem(e.target.value)
  }
  const AddItem = (e) => {
    e.preventDefault()
    setList([...list, {newItem}])
  }
  console.log(list)
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="name" onChange={Item}/>
        <button onClick={AddItem}>add</button>
      </form>
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Testing</h1>
          <input type="search" onChange={handleSearch} />
          <button onClick={handleSubmit}>click me</button>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <h4>Cart</h4>
              {/* {product.map((pro, i) => {
                return (
                  <ul key={i}>
                    <li>{pro.id}</li>
                    <li>{pro.name}</li>
                    {totalQty}
                    <button
                      disabled={pro.qty === totalQty ? true : false}
                      onClick={() =>
                        dispatch({ type: "ADD_QTY", payload: pro.id })
                      }
                    >
                      +
                    </button>
                    <button
                      disabled={totalQty == 1 ? true : false}
                      onClick={() =>
                        dispatch({ type: "REDUCE_QTY", payload: pro.id })
                      }
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: "DELETE", payload: pro.id })
                      }
                    >
                      delete
                    </button>
                  </ul>
                );
              })} */}
            </div>
            {/* <div className="col-6">
              <h4>Searched Products</h4>
              {filtered.map((filter, i) => {
                return (
                  <ul key={i}>
                    <li>{filter.name}</li>
                  </ul>
                );
              })}
            </div> */}
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            {productData.map((prod, i) => {
              return (
                <div key={i} className="col-6">
                  <ul>
                    <li>
                      <img src={prod.url} alt="img" />
                    </li>
                    <li>{prod.name}</li>
                    <li>
                      {/* <button
                        onClick={() =>
                          dispatch({
                            type: "ADD",
                            payload: { name: prod.name, id: prod.id },
                          })
                        }
                      >
                        ADD PRODUCT
                      </button> */}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
